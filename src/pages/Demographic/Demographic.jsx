import React, {useState} from "react";

import styles from "./Demographic.module.scss";

import { useParams, useNavigate } from 'react-router-dom';

import * as communication from "../../utils/communication";



const Demographic = () => {


	const [age, setAge] = useState("");

	const [gender, setGender] = useState("");

	const [education, setEducation] = useState("");

	const [major, setMajor] = useState("");

	const [familVis, setFamilVis] = useState("");

	const [familScatter, setFamilScatter] = useState("");

	const navigate = useNavigate();

	const { lang, exp, participant } = useParams();

	const confirmSurvey = async () => {
		await communication.postSurveyResult(
			age, gender, education, major, familVis, familScatter, participant
		)
	}
	


	return (
		<div>
			<h1>{"Demographic Survey"}</h1>
			<p>{"Please fill out the following survey"}</p>
			<div className={styles.demoWrapper}>
				<p>{"Age:"}</p>
				<input type="text" value={age} onChange={(e) => setAge(e.target.value)}  className={styles.textInputWrapper}/>
			</div>
			<div className={styles.demoWrapper}>
				<p>{"Gender:"}</p>
				{/* radio: Male, Female, others */}
				<label>
					<input type="radio" value="Male" checked={gender === "Male"} onChange={() => {setGender("Male")}}/>{"Male"}
				</label>
				<label>
					<input type="radio" value="Female" checked={gender === "Female"} onChange={() => {setGender("Female")}}/>{"Female"}
				</label>
				<label>
					<input type="radio" value="Others" checked={gender === "Others"} onChange={() => { setGender("Others") }} />{"Others"}
				</label>

			</div>
			<div className={styles.demoWrapper}>
				<p>{"Education:"}</p>
				<label>
					<input type="radio" value="Undergraduate" checked={education === "Undergraduate"} onChange={() => { setEducation("Undergraduate") }} />{"Undergraduate"}
				</label>
				<label>
					<input type="radio" value="Bachelor" checked={education === "Bachelor"} onChange={() => { setEducation("Bachelor") }} />{"Bachelor"}
				</label>
				<label>
					<input type="radio" value="Master" checked={education === "Master"} onChange={() => { setEducation("Master") }} />{"Master"}
				</label>
				<label>
					<input type="radio" value="Ph.D." checked={education === "Ph.D."} onChange={() => { setEducation("Ph.D.") }} />{"Ph.D."}
				</label>

			</div>
			<div className={styles.demoWrapper}>
				<p>{"Major:"}</p>
				<input type="text" value={major} onChange={(e) => setMajor(e.target.value)} className={styles.textInputWrapper} />
			</div>
			<div className={styles.demoWrapper}>
				<p>{"Familarity to Data Visualization:"}</p>
				<label>
					<input type="radio" value="Novice" checked={familVis === "Novice"} onChange={() => { setFamilVis("Novice") }} />{"Novice"}
				</label>
				<label>
					<input type="radio" value="Intermediate" checked={familVis === "Intermediate"} onChange={() => { setFamilVis("Intermediate") }} />{"Intermediate"}
				</label>
				<label>
					<input type="radio" value="Expert" checked={familVis === "Expert"} onChange={() => { setFamilVis("Expert") }} />{"Expert"}
				</label>
			</div>
			<div className={styles.demoWrapper}>
				<p>{"Familarity to Scatterplots:"}</p>
				<label>
					<input type="radio" value="Novice" checked={familScatter === "Novice"} onChange={() => { setFamilScatter("Novice") }} />{"Novice"}
				</label>
				<label>
					<input type="radio" value="Intermediate" checked={familScatter === "Intermediate"} onChange={() => { setFamilScatter("Intermediate") }} />{"Intermediate"}
				</label>
				<label>
					<input type="radio" value="Expert" checked={familScatter === "Expert"} onChange={() => { setFamilScatter("Expert") }} />{"Expert"}
				</label>
			</div>
			<div className={styles.buttonWrapper}>
				<button
					onClick={() => { 
						(async () => {
							await confirmSurvey();
							navigate(`/${lang}/${exp}/${participant}/0`);
						})();
						}}
				>{"Start Experiment!!"}</button>
			</div>

		</div>
	)
}

export default Demographic;