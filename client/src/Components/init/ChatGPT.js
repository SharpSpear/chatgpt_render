import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import Slide from "react-reveal";
import Popup from "../Popup";
import Axios from "axios";
import { useHistory} from "react-router-dom";
import {Survey_data} from "../../actions/init"
import {useSelector, useDispatch} from "react-redux";
import Result from "./Result";
import {Configuration, OpenAIApi} from 'openai';
import { useToasts } from 'react-toast-notifications';
import Footer from "./Footer";

const configuration = new Configuration({
	organization: process.env.REACT_APP_OPENAIORGANIZATION,
	apiKey: process.env.REACT_APP_OPENAIAPI,
});
const openai = new OpenAIApi(configuration);
const ChatGPT = () => {

	const history = useHistory();
	const { addToast } = useToasts()
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	
	const back = () =>{
		history.push("/");
	}
 	
	const getResponse = async() => {
		try{
			const res = await openai.createChatCompletion({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'system',
						content: input,
					},
				],
			})
			// .then((res) => {
			// 	setOutput(res.data.choices[0].message.content);
				
			// }).catch((error) => {
			// 	console.log(error);
			// });
			const output1 = await res.data.choices[0].message.content;
			setOutput(output1)
			const respon = await Axios.post(
				"https://maksimkholin-chatgpt-deploy.onrender.com/users/save",
				{input,output1}
			)
			// .then(() => {
			console.log('response', respon.data.msg)
			addToast( respon.data.msg, {
				appearance: 'info',
				autoDismiss: true,
			})
			setInput("")
		} catch(err) {
			addToast(err.response.data.msg, {
                appearance: 'error',
                autoDismiss: true,
            })
		}
	}

	// useEffect(() => {		
	// 	const data = {input, output};
	// 	const response = Axios.post(
	// 		"http://localhost:5000/users/save",
    //         data
	// 	).then(() => {
	// 		console.log('response', response)
	// 		// addToast( success, {
    //         //     appearance: 'info',
    //         //     autoDismiss: true,
    //         // })
	// 	})
	// }, [output]);

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
								<h1 style={{fontSize: 30, color: 'red'}}>Start the Chatting with ChatGPT</h1><br/><br/><br/>
								<div className="example-popup" size={80}>
									<input type="text" value={input} onChange={e => setInput(e.target.value)} style={{margin: 20, color: "blue", fontSize: 20, width: '50%', padding: 10}} placeholder="Input what you want to ask..."></input>
								</div>
								<button className="btn" onClick={getResponse} style={{padding:10}}>Ask</button>
								<textarea style={{width: '100%', fontSize: 15}} value={output}></textarea>
							</div>
						</div>
					</div>
				</Slide>
			</section>

			<Footer/>
		</>
		
	);
}

export default ChatGPT;

