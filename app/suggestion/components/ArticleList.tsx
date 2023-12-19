'use client';
import { ArticleType } from '@/constant/Api';
import { postArticle, postArticleCollectionCheck, postOutcomes } from '@/utils/request';
import { Pagination, Tab, Tabs } from '@nextui-org/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import DiseaseArticleContent from './DiseaseArticleContent';

function ArticleList() {
	const { address, isConnected } = useAccount();
	const [collectionOrNot, setCollectionOrNot] = useState([] as ArticleType[]);
	const [selected, setSelected] = useState('For you');
	const [articleList, setArticleList] = useState([] as ArticleType[]);
	const [pagination, setPagination] = useState({
		data: [] as ArticleType[],
		count: 0,
		pageNum: 1,
		pageSize: 10,
		total: 0,
	});
	const variants = ['For you', 'Heart Disease', 'Heart Failure Clinical Records', 'Parkinsons', 'Breast Cancer'];

	const getInformation = async (address: any) => {
		const res = await postOutcomes({ user: address, page: 0, page_size: 20 });
		const uniqueDiseases = [...new Set(res?.data?.map((item) => item.disease))];
		try {
			const resp = await postArticle({ diseases: uniqueDiseases });
			if (resp.ok) {
				setArticleList(resp.data);
			} else {
				setArticleList([]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const diseaseRelated = async (diseases: string) => {
		const resp = await postArticle({ diseases: [diseases] });
		if (resp?.ok) {
			setArticleList(resp.data);
		} else {
			setArticleList([]);
		}
	};

	const articleCollectionInterface = async (user: any) => {
		try {
			const resp = await postArticleCollectionCheck({ user });
			setCollectionOrNot(resp?.data);
		} catch (error) {
			console.log(error);
		}
	};

	const DetermineIfCollection = (str: string): boolean => {
		for (let i = 0; i < collectionOrNot.length; i++) {
			if (collectionOrNot[i].url === str) {
				return true;
			}
		}
		return false;
	};

	useEffect(() => {
		setPagination((s) => ({ ...s, pageNum: 1 }));

		if (selected === 'For you') {
			getInformation(address);
		} else {
			diseaseRelated(selected);
		}

		if (address && isConnected) {
			articleCollectionInterface(address);
		} else {
			setCollectionOrNot([]);
		}
	}, [selected, address, isConnected]);

	const onPaginationChange = useCallback(
		(page: number) => {
			setPagination((prevPagination) => ({
				...prevPagination,
				pageNum: page,
				data: articleList.slice((page - 1) * prevPagination.pageSize, page * prevPagination.pageSize),
			}));
		},
		[articleList]
	);

	useEffect(() => {
		setPagination((p) => ({
			...p,
			total: Math.ceil(articleList.length / pagination.pageSize),
			data: articleList.slice((p.pageNum - 1) * p.pageSize, p.pageNum * p.pageSize),
		}));
	}, [articleList, pagination.pageSize]);

	const bottomContent = useMemo(() => {
		return (
			pagination.total > 1 && (
				<div className='py-2 px-2 flex justify-between items-center'>
					<Pagination
						showControls
						classNames={{
							cursor: 'bg-foreground text-background',
						}}
						color='default'
						page={pagination.pageNum}
						total={pagination.total}
						onChange={onPaginationChange}
					/>
				</div>
			)
		);
	}, [pagination, onPaginationChange]);

	return (
		<div className='flex w-full flex-col '>
			<Tabs
				//@ts-ignore
				selectedKey={selected}
				//@ts-ignore
				onSelectionChange={setSelected}
				size='lg'
				color='primary'
				variant='solid'
				radius='md'
				classNames={{ tabList: 'gap-24', cursor: 'w-full bg-[#7828c8]' }}
			>
				{variants.map((variant) => (
					<Tab key={variant} title={variant}>
						{pagination.data.length > 0 ? (
							pagination.data.map((v, index) => (
								<DiseaseArticleContent articleCollectionInterface={articleCollectionInterface} DetermineIfCollection={DetermineIfCollection} item={v} key={index} />
							))
						) : (
							<>No related articles</>
						)}
					</Tab>
				))}
			</Tabs>
			{bottomContent}
		</div>
	);
}

export default ArticleList;
