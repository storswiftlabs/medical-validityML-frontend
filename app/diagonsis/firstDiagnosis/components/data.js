import React from 'react';
export const animals = [
	{ label: 'Cat', value: 'cat', description: 'The second most popular pet in the world' },
	{ label: 'Dog', value: 'dog', description: 'The most popular pet in the world' },
	{ label: 'Elephant', value: 'elephant', description: 'The largest land animal' },
	{ label: 'Lion', value: 'lion', description: 'The king of the jungle' },
	{ label: 'Tiger', value: 'tiger', description: 'The largest cat species' },
	{ label: 'Giraffe', value: 'giraffe', description: 'The tallest land animal' },
	{
		label: 'Dolphin',
		value: 'dolphin',
		description: 'A widely distributed and diverse group of aquatic mammals',
	},
	{ label: 'Penguin', value: 'penguin', description: 'A group of aquatic flightless birds' },
	{ label: 'Zebra', value: 'zebra', description: 'A several species of African equids' },
	{
		label: 'Shark',
		value: 'shark',
		description: 'A group of elasmobranch fish characterized by a cartilaginous skeleton',
	},
	{
		label: 'Whale',
		value: 'whale',
		description: 'Diverse group of fully aquatic placental marine mammals',
	},
	{ label: 'Otter', value: 'otter', description: 'A carnivorous mammal in the subfamily Lutrinae' },
	{ label: 'Crocodile', value: 'crocodile', description: 'A large semiaquatic reptile' },
];

export const BodyStructure = [
	{
		label: 'Neck', 
		options: [
			{ label: 'Sore throat', value: 'Sore throat', OptGroup: 'neck' },
			{ label: 'Painful swallowing', value: 'Painful swallowing', OptGroup: 'neck' },
			{ label: 'Difficulty swallowing', value: 'Difficulty swallowing', OptGroup: 'neck' },
			{ label: 'Red throat', value: 'Red throat', OptGroup: 'neck' },
			{ label: 'Cough', value: 'Cough', OptGroup: 'neck' },
			{ label: 'Enlarged lymph nodes', value: 'Enlarged lymph nodes', OptGroup: 'neck' },
			{ label: 'Pain in the neck', value: 'Pain in the neck', OptGroup: 'neck' },
			{ label: 'Clearing the throat', value: 'Clearing the throat', OptGroup: 'neck' },
		],
	},
	{
		label: 'Head', 
		options: [
			{ label: 'Headache', value: 'Headache', OptGroup: 'head' },
			{ label: 'Dizzy', value: 'Dizzy',OptGroup: 'head' },
			{ label: 'Recent head area injury', value: 'Recent head area injury', OptGroup: 'head' },
			{ label: 'Impaired memory', value: 'Impaired memory', OptGroup: 'head' },
		],
	},
	{
		label: 'Chest', 
		options: [
			{ label: 'Palpitations', value: 'Palpitations', OptGroup: 'chest' },
			{ label: 'Shallow breathing', value: 'Shallow breathing', OptGroup: 'chest' },
			{ label: 'Shortness of breath', value: 'Shortness of breath', OptGroup: 'chest' },
			{ label: 'Pressing chest pain', value: 'Pressing chest pain', OptGroup: 'chest' },
			{ label: 'Fast heart rate', value: 'Fast heart rate', OptGroup: 'chest' },
			{ label: 'Slow heart rate', value: 'Slow heart rate', OptGroup: 'chest' },
			{ label: 'Coronary artery disease', value: 'Coronary artery disease', OptGroup: 'chest' },
			{ label: 'Typical angina', value: 'Typical angina', OptGroup: 'chest' },
			{ label: 'Atypical angina', value: 'Atypical angina', OptGroup: 'chest' },
			{ label: 'Non-anginal pain', value: 'Non-anginal pain', OptGroup: 'chest' },
		],
	},
	{
		label: 'Abdomen', 
		options: [
			{ label: 'Central abdominal pain', value: 'Central abdominal pain', OptGroup: 'abdomen' },
			{ label: 'Lumbar pain', value: 'Lumbar pain', OptGroup: 'abdomen' },
			{ label: 'Lump in stomach', value: 'Lump in stomach', OptGroup: 'abdomen' },
			{ label: 'Bloating', value: 'Bloating', OptGroup: 'abdomen' },
			{ label: 'Black coloured stool', value: 'Black coloured stool', OptGroup: 'abdomen' },
			{ label: 'Increased abdominal size', value: 'Increased abdominal size', OptGroup: 'abdomen' },
			{ label: 'Stomach pain', value: 'Stomach pain', OptGroup: 'abdomen' },
		],
	},
	{
		label: 'Lower Abdomen',
		options: [
			{ label: 'Diabetes mellitus', value: 'Diabetes mellitus', OptGroup: 'lowerAbdomen' },
			{ label: 'Urinating often', value: 'Urinating often', OptGroup: 'lowerAbdomen' },
			{ label: 'Micturition pains', value: 'Micturition pains', OptGroup: 'lowerAbdomen' },
			{ label: 'Burning of urethra, itch, swelling of urethra outlet', value: 'Burning of urethra, itch, swelling of urethra outlet', OptGroup: 'lowerAbdomen' },
		],
	},
	{
		label: 'Limbs', 
		options: [
			{ label: 'Wrist pain', value: 'Wrist pain', OptGroup: 'limbs' },
			{ label: 'Pedal edema', value: 'Pedal edema', OptGroup: 'limbs' },
			{ label: 'Pain in lower limb', value: 'Pain in lower limb', OptGroup: 'limbs' },
			{ label: 'Pain in one foot', value: 'Pain in one foot', OptGroup: 'limbs' },
			{ label: 'Pain in hand or fingers', value: 'Pain in hand or fingers', OptGroup: 'limbs' },
		],
	},
];
