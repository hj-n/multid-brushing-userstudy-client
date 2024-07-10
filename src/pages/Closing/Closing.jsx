import React from 'react';
import closingInfo from "./closingInfo.json";

import { useParams } from 'react-router-dom';
import Parser from 'html-react-parser';


const Closing = () => {

	const { lang } = useParams();
	const closingInfoLang = closingInfo[lang]


	return (
		<div>
			<h1>{closingInfoLang.title}</h1>
			{closingInfoLang.description.map((paragraph, index) => {
				return <p key={index}>{Parser(paragraph)}</p>
			})}

		</div>
	)
};

export default Closing;