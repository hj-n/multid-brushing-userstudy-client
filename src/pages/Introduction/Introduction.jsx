
import React from 'react';
import introInfo from "./introInfo.json";
import { useParams } from 'react-router-dom';

import Parser from 'html-react-parser';
import styles from "./Introduction.module.scss";



const Introduction = () => {


	const { lang, exp } = useParams();

	const introInfoLang = introInfo[lang]

	return (
		<div>
			<h1>{introInfoLang.title}</h1>
			{introInfoLang.description.map((paragraph, index) => {
				return <p key={index}>{Parser(paragraph)}</p>
			})}
		</div>
	)
}

export default Introduction;