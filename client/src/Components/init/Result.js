import React from "react";
import Slide from "react-reveal";
import Chart from "react-apexcharts";
import {useSelector} from "react-redux";
// import { useHistory} from "react-router-dom";

function Result() {
	
	const survey_item = useSelector(state=>state.tutorials.surveyData);
	// const survey_item = survey_items[0];
	// const history = useHistory();

	const bar_options = {
		charts:{
			id: "apexchart"
		},
		xaxis: {
			categories: ['Q1','Q2','Q3','Q4','Q5']
		}
	};

	const bar_series = [{
		name: "series",
		data: [survey_item[0], survey_item[1], survey_item[2], survey_item[3], survey_item[4]]
	}];

	const radia_options = {
		labels: ["Score"],
	};

	const radia_series = [(survey_item[0] + survey_item[1] + survey_item[2] + survey_item[3] + survey_item[4]) * 4];

	return (
		<section id="result">
			<Slide left duration={1300}>
				<h1 style={{textAlign:"center"}}>Your Results</h1>
				<div style={{display:"flex", justifyContent:"center"}}>				
					<div style={{width: "40%", textAlign:"center"}}>
						<h2 style={{textAlign:"center"}}>Questionire Score</h2><br/>
						<Chart options={radia_options} series={radia_series} type="radialBar" height={220}/>
						<Chart options={bar_options} series={bar_series} type="bar" height={320} />	
					</div>
					<div style={{width: "5%"}}>
					</div>
					<div style={{width: "40%", textAlign:"center"}}>
						<h2 style={{textAlign:"center"}}>Humanness Score</h2><br/><br/><br/><br/>
						<h3 >Congratulations!</h3><br/><br/>
						<h3>
							You have receiced all scores about our typeform survey and your score is displayed in charts.
						</h3>
						
					</div>
				</div>
			</Slide>
		</section>
	);	
}

export default Result;

