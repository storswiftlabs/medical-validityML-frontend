'use client';
import React from 'react';
import Image from 'next/image';

function Page() {
	//TODO:to be developed
	return (
		<div className='bg-[#1e202b]text-[#fff]'>
			<div className='bg-no-repeat w-full h-[40rem] bg-center bg-cover flex items-center  relative page-banner bg-[url(/bg_image_1.jpg)]'>
				<div className='overlay-dark'></div>
				<div className='text-[#fff] z-10 leading-[3rem] px-[10%]'>
					<h2 className='text-[4.25rem]  '>About Us</h2>
					<div className='AboutUs'></div>
				</div>
			</div>
			<div className='p-[6.25rem]'>
				<h2 className='text-[3.375rem] mb-[2rem]'>Who we are</h2>
				<div className='mb-[4rem] flex gap-4'>
					<div className='flex flex-col gap-4'>
						<span>
							{/* Founded in 2002 we are an independent consultancy devoid of any preconceived agenda. We are a global organisation, headquartered in the UK, with
							operations in North America based in Seattle and Pacific Rim based in Sydney. */}
						</span>
						<span>
							{/* Organisations need to face the realities such as "will their staff be willing to face the hurdles of a commute?", "can workspaces be satisfactory be
							(re)configured to instil confidence and safety in their workforces?", and more. */}
						</span>
						<span>
							{/* Our forte is transforming work practices and workplaces to a new business normality. We employ Quora’s unique AI based Work Excellence Platform® to
							focus on improving diversity, inclusion, productivity and controlling costs. */}
						</span>
						<span>
							{/* Our team each have direct experience of transforming business performance with their prior organisations including: ARM Holdings, BG Group, BMW, BOC,
							Citi, Dentons, GEC, Hewlett Packard, IBM, MCI, Pearson Group, Unilever, and Virgin Group. */}
						</span>
					</div>
					<div className='flex flex-col gap-4'>
						<span>
							Founded in 2002 we are an independent consultancy devoid of any preconceived agenda. We are a global organisation, headquartered in the UK, with
							operations in North America based in Seattle and Pacific Rim based in Sydney.
						</span>
						<span>
							{/* Organisations need to face the realities such as "will their staff be willing to face the hurdles of a commute?", "can workspaces be satisfactory be
							(re)configured to instil confidence and safety in their workforces?", and more. */}
						</span>
						<span>
							{/* Our forte is transforming work practices and workplaces to a new business normality. We employ Quora’s unique AI based Work Excellence Platform® to
							focus on improving diversity, inclusion, productivity and controlling costs. */}
						</span>
						
					</div>
				</div>
				<div className='my-4 bg-[#191b24] h-[2px]'></div>
				<div className='mt-[4rem] flex items-start gap-12 mb-[4rem]'>
					<Image src='/bg.jpg' width={500} height={500} alt='Picture of the author' />
					<div>
						<h2 className='text-[3.375rem] mb-[2rem]'>Our vision</h2>
						<div className='flex flex-col gap-4 text-[1.2rem]'>
							{/* <p>
								Times are uncertain and changing is beyond question – and whenever there’s change, there comes huge pressure on business leaders to get it right,
								and to do so first time.
							</p>
							<p>
								Business leaders can no longer make decisions based on ‘gut reaction’, ‘past experience’, and ‘best guess’ – second chances do not come along today.
								At Quora, we passionately believe in supporting our clients on a journey of achievable transformation, something that we commonly find business
								leaders struggle to grasp.
							</p>
							<p>
								Ours is a simultaneous head, heart, and hands voyage driven by Quora’s Work Excellence Platform™ that takes organisations to new work futures that
								are not necessarily defined today. Along the way, we create a far more engaged, happier, and productive workforce. And in turn, this enthusiasm
								enhances attraction, recruitment and retention of the very best and brightest talent.
							</p> */}
							<p>
								Our aim is to continually inform clients, to help focus their limited resources, prioritise their workplace investments, and ultimately avoid
								solving the wrong problem really well.
							</p>
						</div>
					</div>
				</div>
				<div className='my-4 bg-[#191b24] h-[2px] '></div>
				<div className='mt-[4rem]'>
					<h2 className='text-[3.375rem] mb-[2rem]'>Our Credentials</h2>
					<div className='flex justify-between gap-24'>
						<p className='w-[80%]'>
							Our clients truly span all sizes and every industry, from public to private sector, from automotive to charity, from financial to pharmaceutical, from
							law firm to rail firm, from mobile telco to medical, from underwriters to utilities, from global corporate to start-up.
						</p>
						<p>Here’s just a few of the better-known names that we have collaborated with and provided successful future solutions.</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;
