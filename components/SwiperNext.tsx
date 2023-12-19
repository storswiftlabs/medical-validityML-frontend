'use client';
import { useEffect, useState } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Card, CardBody, CardHeader, Tooltip } from '@nextui-org/react';
import { Heart } from './Icon/AcmeLogo';
import { Datum } from '@/constant/Api';
import { getDiseases } from '@/utils/request';
import Link from 'next/link';

export default function SwiperNext() {
	const [allData, setAllData] = useState<Datum[]>([]); // Receive all data
	useEffect(() => {
		gettingData();
	}, []);

	const gettingData = async () => {
		try {
			const res = await getDiseases();
			res.ok && setAllData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Swiper
				slidesPerView={3}
				spaceBetween={0}
				speed={1000}
				autoplay={{
					delay: 1000,
					disableOnInteraction: false,
					reverseDirection: false,
				}}
				pagination={{
					clickable: true,
				}}
				direction={'horizontal'}
				noSwiping={true}
				initialSlide={3}
				loop={true}
				effect='cards' // Setting up card effects
				cardsEffect={{
					slideShadows: false, // Whether to show shadows between cards
				}}
				// navigation={true}
				modules={[Autoplay, Pagination]}
				className='mySwiper'
			>
				{allData.map((i, index) => {
					return (
						<SwiperSlide key={index}>
							<div key={index} className='p-[1rem] min-w-full'>
								<Link href={`/diagonsis?name=${i.name}`}>
									<Card
										isBlurred
										className='cursor-pointer w-[90%] py-[1rem] h-[16rem] card hover:scale-105 transition duration-300 flex direction direct bg-background/60'
									>
										<CardHeader>
											<div className='flex items-center'>
												<Heart />
												<span className='ml-4'>{i.name}</span>
											</div>
										</CardHeader>
										<CardBody className='pt-[0]'>
											<Tooltip className='max-w-[30rem]' placement='bottom' content={i.description}>
												<div className='overflow-hidden overflow-ellipsis line-clamp-4'>{i.description}</div>
											</Tooltip>
										</CardBody>
									</Card>
								</Link>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</>
	);
}
