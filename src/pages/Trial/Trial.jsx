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

	let start = null;
	let end = null;

	let trialInfo = null;

	const pointRenderingStyle = {
		"style": "monochrome",
		"size": 20,
		"inversed": true,
		"pixelWidth": 28,
		"pixelHeight": 28,
		"removeBackground": true,
	}

	const confirmBrushing = async () => {

		if (trialInfo.stage === "training") return;

		end = Date.now();
		const status = multidbrushing.getBrushingStatus();
		const brushedIndex = Array.from(status[0]);
		const completionTime = (end - start) / 1000;

		await communication.postBrushingResult(brushedIndex, completionTime, exp, participant, trial, trialInfo.identifier);
	}


	useEffect(() => {

		buttonRef.current.disabled = true;
		buttonRef.current.style.cursor = "not-allowed";
		(async () => {
			trialInfo = await communication.getTrialInfo(exp, participant, trial);
			console.log(trialInfo)
			const preprocessed = await communication.getPreprocessedData(exp, trialInfo.identifier);
			
			brushingName = {
				"dab": "Distortion-Aware Brushing",
				"sb": "Similarity Brushing",
				"ddb": "Data-Driven Brushing",
				"mbb": "M-Ball Brushing"
			}[trialInfo.technique]

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
				descriptionRef.current.innerHTML = "Accurately brush the designated digit. Press the button to proceed.";
				if (trialNumber !== 9)
					buttonRef.current.innerHTML = "Proceed to the next trial";
				else
					buttonRef.current.innerHTML = "Proceed to the next technique";


				if (trialInfo.distortion_inspection == "global_local") {
					showDensityId = true;
					showClosenessId = true;
				} 
				else if (trialInfo.distortion_inspection == "global") {
					showDensityId = true;
					showClosenessId = false;
				}
				else if (trialInfo.distortion_inspection == "no") {
					showDensityId = false;
					showClosenessId = false;
				}
			}
			designationRef.current.innerHTML = `Designated Digit: <em style="color:rgba(64, 156, 255); font-size: 1.5rem" > ${trialInfo.target} </em>`;




			multidbrushing = new MultiDBrushing(
				preprocessed, canvasRef.current, 600,
				() => {}, pointRenderingStyle,
				showDensityId, showClosenessId,
				trialInfo.technique
			);

			if (parseInt(trial) < 39) {
				navigateTarget = `/${lang}/${exp}/${participant}/${parseInt(trial) + 1}`
			}
			else if (parseInt(trial) === 39) {
				navigateTarget = `/${lang}/closing`
			}

			canvasRef.current.addEventListener("mousemove", (event) => {
				if (start === null) {
					start = Date.now();
					console.log(start)

					buttonRef.current.disabled = false;
					buttonRef.current.style.cursor = "pointer"
				}	
			});
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
					className={styles.disablableButton}
					onClick={() => { 
						(async() => {
							await confirmBrushing(); 
							navigate(navigateTarget); 
							window.location.reload(); 
						})();
						
					}}
					ref={buttonRef}
				></button>
			</div>
		</div>
	)


}

export default Trial;