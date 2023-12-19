export interface Welcome {
	ok: boolean;
	count: number;
	msg: string;
	data: Datum[];
}

export interface Datum {
	name: string;
	description: string;
	icon: string;
}

export interface WelcomeInfo {
	ok: boolean;
	msg: string;
	data: Data;
}

export interface Data {
	name: string;
	description: string;
	inputs: Input[];
	output: Output;
}

export interface Input {
	name: string;
	description: string;
	index: string;
	input_method: string;
	select: Select[];
	default?: any;
}

export interface Select {
	key: string;
	value: number | string;
}

export interface Output {
	description: string;
	result: Result[];
}

export interface Result {
	Key: string;
	Value: string;
}

export interface OperatorListType {
	ok: boolean;
	count: number;
	msg: string;
	data: OperatorList[];
}

export interface OutcomesType {
	ok: boolean;
	msg: string;
	count: number;
	data: OutcomesType_Data[];
}

export interface OutcomesType_Data {
	id: number;
	disease: string;
	end_time: number;
	status: string;
	inputs: string;
	message: string;
	output: string;
	module: string;
	start_time: string;
	icon: string;
}

export interface ArticleType {
	disease: string;
	url: string;
	time: number;
	icon: string;
	title: string;
}
export interface ChecklistType {
	ID: number;
	CreatedAt: Date;
	UpdatedAt: Date;
	DeletedAt: null;
	Disease: string;
	URL: string;
	Time: number;
	Icon: string;
	Title: string;
}

export interface OperatorList {
	name: string;
	description: string;
}

export interface DiseaseCategoryType {
	ok: boolean;
	count: number;
	msg: string;
	data: DiseaseData;
}

export interface DiseaseData {
	id: number;
	diseases: DiseaseItem[];
}

export interface DiseaseItem {
	name: string;
	description: string;
	positions: string[];
	icon: string;
}
