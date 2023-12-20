'use client';
import DiagnosisCard from '@/components/Home/DiagnosisCard';
import FirstDiagnosis from '@/components/Home/FirstDiagnosis';
import ForYou from '@/components/Home/ForYou';
import ImageComponent from '@/components/Home/ImageComponent';
import FormData from '../components/FormData';

export default function Home() {
	return (
		<div>
			
			<ImageComponent />
			<ForYou />
			<FirstDiagnosis />
			<DiagnosisCard />
			{/* <SwiperNext /> */}
			{/* <CardGuide /> */}
			{/* <StartWith /> */}
		</div>
	);
}
