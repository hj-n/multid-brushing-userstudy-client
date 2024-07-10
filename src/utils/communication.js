import axios from "axios";
import axiosRetry from "axios-retry";

const server = "http://127.0.0.1:5000"


export async function getTrialInfo(exp_num, participant_num, trial_num){
	axiosRetry(axios, { retries: 3 });

	exp_num = parseInt(exp_num[3])
	participant_num = parseInt(participant_num[1])


	const response = await axios.get(`${server}/gettrialinfo`, {
		"params": {
			"exp_num": exp_num,
			"participant_num": participant_num,
			"trial_num": trial_num
		}
	})

	return response.data;
}

export async function getPreprocessedData(exp_num, identifier) {
	axiosRetry(axios, { retries: 3 });

	exp_num = parseInt(exp_num[3])

	const response = await axios.get(`${server}/getpreprocesseddata`, {
		"params": {
			"exp_num": exp_num,
			"identifier": identifier
		}
	})

	return response.data;
}