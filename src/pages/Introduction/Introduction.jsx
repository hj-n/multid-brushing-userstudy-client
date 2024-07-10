
import React from 'react';
import introInfo from "./introInfo.json";
import { useParams, useNavigate } from 'react-router-dom';

import Parser from 'html-react-parser';
import styles from "./Introduction.module.scss";



const Introduction = () => {


	const { lang, exp, participant } = useParams();
	const navigate = useNavigate();
	const introInfoLang = introInfo[lang]

	return (
		<div>
			<h1>{introInfoLang.title}</h1>
			{introInfoLang.description.map((paragraph, index) => {
				return <p key={index}>{Parser(paragraph)}</p>
			})}
			<div className={styles.buttonWrapper}>
				<button
					onClick = {() => {navigate(`/${lang}/${exp}/${participant}/0`)}}
				>{"Proceed to Survey"}</button>
			</div>
		</div>
	)
}

export default Introduction;