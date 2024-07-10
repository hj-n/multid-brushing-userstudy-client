import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as communication from "../../utils/communication";

import styles from "./Trial.module.scss";
import MultiDBrushing from "multid-brush";

const Trial = () => {

	const { lang, exp, participant, trial } = useParams();

	const titleRef = useRef(null);
	const descriptionRef = useRef(null);
	const designationRef = useRef(null);
	const buttonRef = useRef(null);
	const canvasRef = useRef(null);
	
	let brushingName = null;
	let showDensityId;
	let showClosenessId;

	let multidbrushing;

	let navigateTarget = null;
	const navigate = useNavigate();

	const pointRenderingStyle = {
		"style": "monochrome",
		"size": 20,
		"inversed": true,
		"pixelWidth": 28,
		"pixelHeight": 28,
		"removeBackground": true,
	}

	const statusUpdateCallback = () => {
		console.log("Status Update Callback");
	}

	useEffect(() => {
		(async () => {
			const trialInfo = await communication.getTrialInfo(exp, participant, trial);
			const preprocessed = await communication.getPreprocessedData(exp, trialInfo.identifier);
			
			brushingName = {
				"dab": "Distortion-Aware Brushing",
				"sb": "Similarity Brushing",
				"ddb": "Data-Driven Brushing",
				"mbb": "M-Ball Brushing"
			}[trialInfo.technique]

			console.log(trialInfo)
			if (trialInfo.stage === "training") {
				titleRef.current.innerText = "Training Session for " + brushingName;
				descriptionRef.current.innerHTML = `You will now have <b>five minutes</b> to familiarize yourself with the ${brushingName} technique. Please try to accurately select the designated digit.`;
				buttonRef.current.innerHTML = "Proceed to the trials";

				showDensityId = true;
				showClosenessId = true;
			}

			if (trialInfo.stage === "experiment") {
				let trialNumber = parseInt(trial) / 10;
				trialNumber = trialNumber - parseInt(trialNumber)
				trialNumber = Math.round(trialNumber * 10);
				titleRef.current.innerText = `Trial ${trialNumber}/9 for ${brushingName}`;
				descriptionRef.current.innerHTML = "Accurately select the designated digit. Press the button to proceed to the next trial.";
				if (trialNumber !== 9)
					buttonRef.current.innerHTML = "Proceed to the next trial";
				else
					buttonRef.current.innerHTML = "Proceed to the next technique";
			}
			designationRef.current.innerHTML = `Designated Digit: <em style="color:rgba(64, 156, 255); font-size: 1.5rem" > ${trialInfo.target} </em>`;


			console.log(preprocessed)

			preprocessed.hd = preprocessed.original_data

			multidbrushing = new MultiDBrushing(
				preprocessed, canvasRef.current, 600,
				statusUpdateCallback, pointRenderingStyle,
				showDensityId, showClosenessId,
				trialInfo.technique
			);

			if (trial < 39) {
				navigateTarget = `/${lang}/${exp}/${participant}/${parseInt(trial) + 1}`
			}



		})();
	})




	return (
		<div>
			<h2 ref={titleRef}></h2>
			<p ref={descriptionRef}></p>
			<h3 ref={designationRef}></h3>
			<div className={styles.canvasWrapper}>
				<canvas
					ref={canvasRef}
					width={"600"}
					height={"600"}
					style={{ 
						width: 600, 
						height: 600,
						border: "1px solid black"
					}}
				></canvas>
			</div>
			<div className={styles.buttonWrapper}>
				<button 
					onClick={() => { navigate(navigateTarget); window.location.reload(); }}
					ref={buttonRef}
				></button>
			</div>
		</div>
	)


}

export default Trial;