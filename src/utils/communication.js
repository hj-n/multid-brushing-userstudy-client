import axios from "axios";
import axiosRetry from "axios-retry";

const server = "http://127.0.0.1:5100"


export async function getTrialInfo(exp_num, participant_num, trial_num){
	axiosRetry(axios, { retries: 3 });

	exp_num = parseInt(exp_num[3])
	if (participant_num.length === 2)
		participant_num = parseInt(participant_num[1])
	else
		participant_num = parseInt(participant_num[1] + participant_num[2])


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

export async function postBrushingResult(brushedIndex, completionTime, exp, participant, trial, identifier) {
	axiosRetry(axios, { retries: 3 });

	exp = parseInt(exp[3])

	if (participant.length === 2)
		participant = parseInt(participant[1])
	else
		participant = parseInt(participant[1] + participant[2])
	trial = parseInt(trial)
	identifier = parseInt(identifier)
	// convert to string
	brushedIndex = brushedIndex.toString()

	const response = await axios.post(`${server}/postbrushingresult`, null, {
		"params": {
			"brushedIndex": brushedIndex,
			"completionTime": completionTime,
			"exp": exp,
			"participant": participant,
			"trial": trial,
			"identifier": identifier
		}
	})

}

export async function postSurveyResult(age, gender, education, major, familVis, familScatter, participant) {
	axiosRetry(axios, { retries: 3 });

	const response = await axios.post(`${server}/postsurveyresult`, null, {
		"params": {
			"age": age,
			"gender": gender,
			"education": education,
			"major": major,
			"familVis": familVis,
			"familScatter": familScatter,
			"participant": participant
		}
	});
}