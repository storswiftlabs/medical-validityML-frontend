import { AuthenticationIcon, DotIcon } from '@/components/Icon/AcmeLogo';
import React, { useState } from 'react';
import { Button, Image } from '@nextui-org/react';
import DiagnosticFramework from '@/components/DiagnosticFramework';

const DotText = ['Possible causes of symptoms.', 'Recommendations on what to do next.'];

const AboutText = ['Verifiable machine learning models using STARKs.'];

function IntroductionComponentA({ paginate }: { paginate: (newDirection: number) => void }) {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};
	return (
		<DiagnosticFramework
			headText='Check your symptoms'
			footer={
				<>
					<div></div>
					<Button
						onPress={() => {
							paginate(1);
						}}
						radius='sm'
						color='primary'
					>
						Next
					</Button>
				</>
			}
		>
			<div className='flex flex-1 p-[2rem] pt-[0]'>
				<div className='w-[60%]'>
					<p className='leading-relaxed'>Take a short (3 mins) symptom assessment. The information you give is safe and won’t be shared. Your results will include:</p>
					<ul className='p-[1rem] leading-relaxed'>
						{DotText.map((item, index) => (
							<li key={index} className='flex gap-4'>
								<DotIcon /> <span>{item}</span>
							</li>
						))}
					</ul>
					<h3
						onClick={() => {
							showDrawer();
						}}
						className='mt-[2rem]'
					>
						About this symptom checker
					</h3>
					<div className='p-[1rem] leading-relaxed'>
						{AboutText.map((item, index) => (
							<p className='flex items-center gap-4' key={index}>
								<AuthenticationIcon />
								{item}
							</p>
						))}
					</div>
				</div>
				<div className='flex-1'>
					<div className='message__illustration'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 240 204'
							role='presentation'
							className='ui-icon ui-message__illustration --icon-color: transparent'
							id='message-illustration'
						>
							<path
								fill='var(--boy-background, #EDF6FD)'
								fill-rule='evenodd'
								d='M205.697 204C226.916 182.355 240 152.705 240 120 240 53.726 186.274 0 120 0S0 53.726 0 120c0 32.705 13.084 62.355 34.303 84z'
								clip-rule='evenodd'
							></path>
							<path
								fill='var(--boy-skin, #FEDDB8)'
								fill-rule='evenodd'
								stroke='var(--boy-skin-outline, #333D48)'
								stroke-width='2'
								d='M188 183h12l4 20h-12z'
								clip-rule='evenodd'
							></path>
							<path stroke='var(--boy-skin-shadow, #1F262C)' stroke-width='2' d='m190 189 10-2.5' opacity='.15'></path>
							<path
								fill='var(--boy-shirt, #71B5F0)'
								fill-rule='evenodd'
								d='M142 153h9v50h-17v-22l-3 7-15-4c0-31 26-31 26-31m34 0h-9v50h17v-22l3 7 15-4c0-31-26-31-26-31'
								clip-rule='evenodd'
							></path>
							<path
								fill='var(--boy-shirt-outline, #333D48)'
								d='M151 153h1a1 1 0 0 0-1-1zm0 50v1a1 1 0 0 0 1-1zm-17 0h-1a1 1 0 0 0 1 1zm0-22h1a1 1 0 0 0-1.919-.394zm-3 7-.258.966a1 1 0 0 0 1.177-.572zm-15-4h-1a1 1 0 0 0 .742.966zm51-31v-1a1 1 0 0 0-1 1zm0 50h-1a1 1 0 0 0 1 1zm17 0v1a1 1 0 0 0 1-1zm0-22 .919-.394A1.001 1.001 0 0 0 183 181zm3 7-.919.394a1 1 0 0 0 1.177.572zm15-4 .258.966A1 1 0 0 0 203 184zm-51-32h-9v2h9zm1 51v-50h-2v50zm-18 1h17v-2h-17zm-1-23v22h2v-22zm-1.081 7.394 3-7-1.838-.788-3 7zm-16.177-3.428 15 4 .516-1.932-15-4zM142 153l-.001-1h-.027l-.066.001a20.292 20.292 0 0 0-1.108.063c-.743.063-1.795.189-3.055.44-2.517.5-5.882 1.501-9.255 3.512C121.676 160.077 115 168.158 115 184h2c0-15.158 6.324-22.577 12.512-26.266 3.127-1.864 6.262-2.8 8.62-3.269a26.025 26.025 0 0 1 2.836-.408c.339-.029.603-.043.78-.05.088-.004.154-.005.197-.006l.046-.001h.01zm25 1h9v-2h-9zm1 49v-50h-2v50zm16-1h-17v2h17zm-1-21v22h2v-22zm4.919 6.606-3-7-1.838.788 3 7zm13.823-4.572-15 4 .516 1.932 15-4-.516-1.932M176 153l-.001 1h.01l.046.001c.043.001.109.002.197.006.177.007.441.021.78.05.68.058 1.658.174 2.836.408 2.358.469 5.493 1.405 8.62 3.269C194.676 161.423 201 168.842 201 184h2c0-15.842-6.676-23.923-13.488-27.984-3.373-2.011-6.738-3.012-9.255-3.512a27.795 27.795 0 0 0-3.055-.44 20.292 20.292 0 0 0-1.108-.063l-.066-.001h-.027z'
							></path>
							<path stroke='var(--boy-shirt-shadow, #1F262C)' stroke-width='3' d='m167 165 5 4' opacity='.15'></path>
							<path fill='var(--boy-shirt-shadow, #1F262C)' fill-rule='evenodd' d='M133 154h4l4 48h-8z' clip-rule='evenodd' opacity='.15'></path>
							<path stroke='var(--boy-shirt-shadow, #1F262C)' stroke-width='3' d='m151 165-5 4' opacity='.15'></path>
							<path fill='var(--boy-undershirt, #fff)' stroke='var(--boy-shirt-outline, #333D48)' stroke-width='2' d='M151 153h16v50h-16z'></path>
							<path
								fill='var(--boy-skin, #FEDDB8)'
								fill-rule='evenodd'
								stroke='var(--boy-skin-outline, #333D48'
								stroke-width='2'
								d='M151 142v11s0 7 8 7 8-7 8-7v-11z'
								clip-rule='evenodd'
							></path>
							<path stroke='var(--boy-skin-shadow, #1F262C)' stroke-width='3' d='M152 145s7 2 14 0' opacity='.15'></path>
							<path
								fill='var(--boy-hair, #5F7285)'
								fill-rule='evenodd'
								stroke='var(--boy-hair-outline, #333D48)'
								stroke-width='2'
								d='M191 75v36h-4V75z'
								clip-rule='evenodd'
							></path>
							<path
								fill='var(--boy-skin, #FEDDB8)'
								fill-rule='evenodd'
								stroke='var(--boy-skin-outline, #333D48)'
								stroke-width='2'
								d='M131 116s0 28 28 28 28-28 28-28V80h-56z'
								clip-rule='evenodd'
							></path>
							<path
								stroke='var(--boy-skin-outline, #333D48)'
								stroke-linecap='round'
								stroke-linejoin='round'
								stroke-width='2'
								d='M159 105v8s-3 0-3 3 3 3 3 3h1'
							></path>
							<path stroke='var(--boy-table-outline, #333D48)' stroke-linecap='round' stroke-width='2' d='M20 203h200'></path>
							<path
								fill='var(--boy-laptop, #D6DDE3)'
								stroke='var(--boy-laptop-outline, #333D48)'
								stroke-width='2'
								d='M62 158a5 5 0 0 1 5-5h62a5 5 0 0 1 5 5v39H62z'
							></path>
							<path
								fill='var(--boy-laptop, #D6DDE3'
								fill-rule='evenodd'
								stroke='var(--boy-laptop-stroke, #333D48)'
								stroke-width='2'
								d='M60 197c0 6 5.7 6 5.7 6h64.6s5.7 0 5.7-6z'
								clip-rule='evenodd'
							></path>
							<circle cx='98' cy='175' r='4' fill='var(--boy-laptop-logo, #fff)' stroke='var(--boy-laptop-logo-outline, #333D48)' stroke-width='2'></circle>
							<path
								fill='var(--boy-browser-page, #fff)'
								fill-rule='evenodd'
								stroke='var(--boy-browser-outline, #333D48)'
								stroke-width='2'
								d='M95.007 111c3.305 0 5.993-2.688 5.993-6.005V43H1v61.995A5.998 5.998 0 0 0 6.993 111H74l15 15v-15z'
								clip-rule='evenodd'
							></path>
							<path fill='var(--boy-browser-page-text, #D6DDE3)' d='M16 61h70v2H16zm0 6h35v2H16z'></path>
							<rect
								width='20'
								height='18'
								x='17'
								y='78'
								fill='var(--boy-browser-page, #fff)'
								stroke='var(--boy-browser-page-button-outline, #D6DDE3)'
								stroke-width='2'
								rx='2'
							></rect>
							<path stroke='var(--boy-browser-page-icon, #71B5F0' stroke-width='2' d='m23 86 3 3 5-5'></path>
							<rect
								width='20'
								height='18'
								x='41'
								y='78'
								fill='var(--boy-browser-page, #fff)'
								stroke='var(--boy-browser-page-button-outline, #D6DDE3)'
								stroke-width='2'
								rx='2'
							></rect>
							<path stroke='var(--boy-browser-page-icon, #71B5F0)' stroke-width='2' d='m48 84 6 6m0-6-6 6'></path>
							<rect
								width='20'
								height='18'
								x='65'
								y='78'
								fill='var(--boy-browser-page, #fff)'
								stroke='var(--boy-browser-page-button-outline, #D6DDE3)'
								stroke-width='2'
								rx='2'
							></rect>
							<path stroke='var(--boy-browser-page-icon, #71B5F0)' stroke-width='2' d='m78 87-3.5 3.5M78 87l-3.5-3.5M78 87h-7'></path>
							<path
								fill='var(--boy-browser, #E7EBEF)'
								fill-rule='evenodd'
								stroke='var(--boy-browser-outline, #333D48)'
								stroke-width='2'
								d='M1 40a6 6 0 0 1 6-6h88a6 6 0 0 1 6 6v3H1z'
								clip-rule='evenodd'
							></path>
							<circle cx='7.5' cy='38.5' r='1.5' fill='var(--boy-browser-button-first, #FA514F)'></circle>
							<circle cx='12.5' cy='38.5' r='1.5' fill='var(--boy-browser-button-second, #FFC037)'></circle>
							<circle cx='17.5' cy='38.5' r='1.5' fill='var(--boy-browser-button-third, #2DC692)'></circle>
							<path fill='var(--boy-browser-page-header, #71B5F0)' d='M2 44h98v8H2z'></path>
							<path stroke='var(--boy-skin-outline, #333D48)' stroke-linecap='round' stroke-width='2' d='M141 103s2-2 8-2m29 2s-2-2-8-2'></path>
							<path
								fill='var(--boy-skin-outline, #333D48)'
								fill-rule='evenodd'
								stroke='var(--boy-skin-outline, #333D48)'
								stroke-width='2'
								d='M151 125h16s-.005 7-8.003 7C151 132 151 125 151 125z'
								clip-rule='evenodd'
							></path>
							<path fill='var(--boy-teeth, #fff)' fill-rule='evenodd' d='M167 125h-16s0 2.1 1.314 4h13.369c1.315-1.9 1.317-4 1.317-4' clip-rule='evenodd'></path>
							<path
								fill='var(--boy-skin-outline, #333D48'
								d='M151 125v-1h-1v1zm16 0 1 .001.001-1.001H167zm-14.686 4-.822.569.298.431h.524zm13.369 0v1h.523l.299-.431zM151 126h16v-2h-16zm2.137 2.431c-.561-.811-.849-1.678-.995-2.354a7.033 7.033 0 0 1-.126-.809 5.5 5.5 0 0 1-.014-.216l-.002-.048v-.008.003l-1 .001-1 .001v.015l.001.028.002.092a8.65 8.65 0 0 0 .184 1.362c.183.849.552 1.982 1.305 3.071l1.645-1.138zm-.823 1.569h13.369v-2h-13.369zM167 125l-1-.001v-.004.008l-.002.048a6.585 6.585 0 0 1-.141 1.025c-.146.677-.435 1.543-.996 2.355l1.644 1.138c.754-1.088 1.124-2.221 1.307-3.07.092-.427.139-.79.163-1.05a6.058 6.058 0 0 0 .024-.404l.001-.028v-.016l-1-.001z'
							></path>
							<rect width='4' height='6' x='171' y='107' fill='var(--boy-skin-outline, #333D48)' rx='2'></rect>
							<rect width='4' height='6' x='144' y='107' fill='var(--boy-skin-outline, #333D48)' rx='2'></rect>
							<path
								stroke='var(--boy-skin-shadow, #1F262C)'
								stroke-linecap='round'
								stroke-linejoin='round'
								stroke-width='4'
								d='M184.098 86.166C179.39 87.818 172.65 89 163 89c-10 0-16-4-20-4s-12 0-12 10'
								opacity='.15'
							></path>
							<path
								fill='var(--boy-hair, #5F7285)'
								fill-rule='evenodd'
								stroke='var(--boy-hair-outline, #333D48)'
								stroke-width='2'
								d='M131 111h-4V84s0-16 12-14c0 0 0-14 20-14 26 0 36 18.5 36 19s0 13-32 13c-10 0-16-4-20-4s-12 0-12 10z'
								clip-rule='evenodd'
							></path>
							<path
								fill='var(--boy-skin, #FEDDB8)'
								fill-rule='evenodd'
								d='M124 111a7 7 0 0 1 7-7v14a7 7 0 0 1-7-7m70 0a7 7 0 0 1-7 7v-14a7 7 0 0 1 7 7'
								clip-rule='evenodd'
							></path>
							<path
								fill='var(--boy-skin-outline, #333D48)'
								d='M131 104h1v-1h-1zm0 14v1h1v-1zm56 0h-1v1h1zm0-14v-1h-1v1zm-56-1a8 8 0 0 0-8 8h2a6 6 0 0 1 6-6zm1 15v-14h-2v14zm-9-7a8 8 0 0 0 8 8v-2a6 6 0 0 1-6-6zm64 8a8 8 0 0 0 8-8h-2a6 6 0 0 1-6 6zm-1-15v14h2v-14zm9 7a8 8 0 0 0-8-8v2a6 6 0 0 1 6 6z'
							></path>
							<path stroke='var(--boy-hair-outline, #333D48)' stroke-linecap='round' stroke-width='2' d='M169 74s8 1 13-3m-20 9s10 2 18-2'></path>
							<path fill='var(--boy-shirt, #71B5F0)' fill-rule='evenodd' d='M146 148h5v15l-5 4-4-14zm26 0h-5v15l5 4 4-14z' clip-rule='evenodd'></path>
							<path
								fill='var(--boy-shirt-outline, #333D48)'
								d='M151 148h1v-1h-1zm-5 0v-1h-.481l-.3.375zm5 15 .625.781.375-.3V163zm-5 4-.962.275.413 1.445 1.174-.939zm-4-14-.781-.625-.322.403.141.497zm25-5v-1h-1v1zm5 0 .781-.625-.3-.375H172zm-5 15h-1v.481l.375.3zm5 4-.625.781 1.174.939.413-1.445zm4-14 .962.275.141-.497-.322-.403zm-25-6h-5v2h5zm1 16v-15h-2v15zm-5.375 4.781 5-4-1.25-1.562-5 4zm-5.587-14.506 4 14 1.924-.55-4-14zm4.181-5.9-4 5 1.562 1.25 4-5-1.562-1.25M167 149h5v-2h-5zm1 14v-15h-2v15zm4.625 3.219-5-4-1.25 1.562 5 4zm2.413-13.494-4 14 1.924.55 4-14zm-3.819-4.1 4 5 1.562-1.25-4-5-1.562 1.25'
							></path>
						</svg>
					</div>
				</div>
			</div>
		</DiagnosticFramework>
	);
}

export default IntroductionComponentA;
