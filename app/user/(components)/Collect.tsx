'use client';
import DiseaseArticleContent from '@/app/suggestion/components/DiseaseArticleContent';
import { ArticleType } from '@/constant/Api';
import { Pagination } from '@nextui-org/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

function Collect({ articleCollectionInterface, collectionOrNot }: { articleCollectionInterface: (user: any) => void; collectionOrNot: ArticleType[] }) {
	const { address } = useAccount();
	const [pagination, setPagination] = useState({
		data: [] as ArticleType[],
		count: 0,
		pageNum: 1,
		pageSize: 10,
		total: 0,
	});

	const onPaginationChange = useCallback(
		(page: number) => {
			setPagination((prevPagination) => ({
				...prevPagination,
				pageNum: page,
				data: collectionOrNot.slice((page - 1) * prevPagination.pageSize, page * prevPagination.pageSize),
			}));
		},
		[collectionOrNot]
	);

	useEffect(() => {
		setPagination((p) => ({
			...p,
			total: Math.ceil(collectionOrNot.length / pagination.pageSize),
			data: collectionOrNot.slice((p.pageNum - 1) * p.pageSize, p.pageNum * p.pageSize),
		}));
	}, [collectionOrNot, pagination.pageSize]);

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

	const DetermineIfCollection = (str: string): boolean => {
		for (let i = 0; i < collectionOrNot.length; i++) {
			if (collectionOrNot[i].url === str) {
				return true;
			}
		}
		return false;
	};

	return (
		<div className='flex w-full flex-col '>
			{pagination.data.length > 0 ? (
				pagination.data.map((v, i) => (
					<DiseaseArticleContent articleCollectionInterface={articleCollectionInterface} DetermineIfCollection={DetermineIfCollection} item={v} key={i} />
				))
			) : (
				<>No related articles</>
			)}
			{bottomContent}
		</div>
	);
}

export default Collect;
