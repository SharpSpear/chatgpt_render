import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import Slide from "react-reveal";
import Popup from "../Popup";
import Axios from "axios";
import { useHistory} from "react-router-dom";
import {Survey_data} from "../../actions/init"
import {useSelector, useDispatch} from "react-redux";
import Result from "./Result";
import Footer from "./Footer";

const randomInRange = (max, min) => {
	return Math.random() * (max - min) + min;
}

const canvasStyles = {
	position: "fixed",
	pointerEvents: "none",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0
};

const getAnimationSettings = (originXA, originXB) => {
	return {
		startVelocity: 30,
		spread: 360,
		ticks: 60,
		zIndex: 0,
		particleCount: 150,
		origin: {
			x: randomInRange(originXA, originXB),
			y: Math.random() - 0.2
		}
	};
}	


const Survey = () => {

	const refAnimationInstance = useRef(null);
	const [intervalId, setIntervalId] = useState();

	const history = useHistory();
	const dispatch = useDispatch();

	const survey_item = useSelector(state=>state.tutorials.surveyData);
	const flag = useSelector(state=>state.tutorials.flag);

	
	const getInstance = useCallback((instance) => {
		refAnimationInstance.current = instance;
	}, []);

	const nextTickAnimation = useCallback(() => {
		if(refAnimationInstance.current) {
			refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
			refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
		}
	}, []);

	const startAnimation = useCallback(() => {
		if(!intervalId){
			setIntervalId(setInterval(nextTickAnimation, 400));
		}
	}, [intervalId, nextTickAnimation]);

	useEffect(() => {		
		return() => {
			clearInterval(intervalId);
		};
	}, [intervalId]);

	const handleChange = async ({responseId}) =>{
		startAnimation();		
		const survey_token = process.env.REACT_APP_TOKEN;
		const surveyData = await Axios.post("https://maksimkholin-chatgpt-deploy.onrender.com/users/survey", {token: survey_token});
		// console.log("555555555555555555", surveyData.data.items[0]);
		dispatch(Survey_data(surveyData));
		// history.push('/');
	}
	
	const back = () =>{
		history.push("/");
	}
 	
	return (
		<>
			<section id="resume">
				<div style={{display:"flex", justifyContent:"left"}}>						
					<button className="btn" onClick={back} style={{margin: "20"}}>Back</button>
				</div>
				<Slide left duration={1300}>
					<div className="row education"> 
						<div className="three columns header-col">
							<div className="row" style={{textAlign: "center"}}>
								<h1>Our Survey on Online</h1><br/><br/><br/>
								<div className="example-popup" size={80}>
									<Popup id={process.env.REACT_APP_FORMID} 								
										onSubmit={handleChange}>
										{!flag ?	
											<button className="btn">Start Survey</button> : <></>
										}
									</Popup>
								</div>
							</div>
						</div>
					</div>
				</Slide>
				{flag ? 
					<Result/> : <></>
				}
			</section>
			<ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
			<Footer/>
		</>
		
	);
}

export default Survey;

