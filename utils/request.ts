import { DiseaseCategoryType, OperatorListType, OutcomesType, Welcome, WelcomeInfo } from '@/constant/Api';
import process from 'process';

const ApiUrl = process.env.NEXT_PUBLIC_FETCH_API;
const ApiUrlOp = process.env.NEXT_PUBLIC_FETCH_API_OPERATOR;
const ApiUser = process.env.NEXT_PUBLIC_FETCH_API_USER;

async function fetchData(apiUrl: string, queryParams: object) {
	try {
		const queryString = Object.entries(queryParams)
			.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
			.join('&');
		const response = await fetch(`${apiUrl}?${queryString}`);
		if (!response.ok) throw new Error('Network response was not ok');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

async function postData(url: string, data: object) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const data_1 = await response.json();
		// console.log(data_1,'data!');

		return data_1;
	} catch (error) {
		console.error('Error:', error);
	}
}

export async function getDiseases(): Promise<Welcome> {
	// Classification of diseases
	return fetchData(ApiUrl + '/disease_list', {});
}

export async function getDiseaseInfo(Obj: { disease: string }): Promise<WelcomeInfo> {
	// Diagnostic information
	return fetchData(ApiUrl + '/disease_info', Obj);
}

export async function getOperatorList(): Promise<OperatorListType> {
	return fetchData(ApiUrlOp + '/module_list', {});
}

export async function postPrediction(Obj: any) {
	return postData(ApiUrlOp + '/disease_prediction', Obj);
}

export async function postRecommend(Obj: any) {
	// Disease recommendations
	return postData(ApiUrlOp + '/recommend', Obj);
}

export async function postOutcomes(Obj: { user: string; page: number; page_size: number }): Promise<OutcomesType> {
	// Projected results
	return postData(ApiUrlOp + '/predicting_outcomes', Obj);
}

export const fetchList = async (url: string) => {
	// ipfs
	const response = await fetch(url);
	const data = await response.text();
	return data;
};

export async function postUser(Obj: any) {
	// Projected results
	return postData(ApiUser + '/register', Obj);
}

export async function postForecastResult(Obj: any) {
	// Disease recommendations
	return postData(ApiUrlOp + '/verify_prediction_results', Obj);
}

export async function postArticle(Obj: any) {
	// article interface
	return postData(ApiUrlOp + '/article', Obj);
}

export async function postArticleCollectionCheck(Obj: any) {
	// Article Collection Check
	return postData(ApiUser + '/article_collection_check', Obj);
}

export async function postBookmarkAndCancel(Obj: any) {
	//Bookmark and Cancel
	return postData(ApiUser + '/article_collection', Obj);
}

export async function postDiagnosticDeletion(Obj: any) {
	// Diagnostic deletion
	return postData(ApiUrlOp + '/DeletePredictedRecord', Obj);
}

export async function getDiseaseCategory(Obj: any): Promise<DiseaseCategoryType> {
	return postData(ApiUrl + '/diseases', Obj);
}

export async function getDiseaseInfoApi(Obj: { disease: string; id: number }) {
	return postData(ApiUrl + '/disease_info', Obj);
}

export async function predictionReload(Obj: { user: string; id: number }) {
	return postData(ApiUrlOp + '/disease_prediction_reload', Obj);
}

export async function getUpDate(Obj: { user: string; key: string; page: number; page_size: number }) {
	return postData(ApiUrlOp + '/predicting_outcomes_fuzzy_query', Obj);
}
