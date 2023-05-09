import React, {useEffect} from "react";
import { Fade, Slide } from "react-reveal";
import {useSelector} from "react-redux";
import * as typeformEmbed from "@typeform/embed";
import Popup from "../Popup"

function Contact() {

	const data = useSelector(state=>state.tutorials.init_data.main);

	const handleChange = () =>{
		console.log("Ddffffffffffff");
	}

	return (
		<section id="contact">
			<Fade bottom duration={1000}>
				<div className="row section-head">
					<div className="two columns header-col" style={{float:"none"}}>
						<h1>
							Interested?<br/>
							Let's Get In Touch
						</h1>
					</div>
				</div>
			</Fade>
			<div className="row">
				<Slide left duration={1000}>
					<div className="eight columns">
						<form action="" method="post" id="contactForm" name="contactForm">
							<div className="row" style={{display:"flex"}}>
								<div style={{width:"40%"}}>
									<div className="form-group">
										<input
											type="text"
											defaultValue=""
											size="35"
											id="contactName"
											name="contactName"
											placeholder="Your Name"
											onChange={handleChange}
										/>
									</div>
									<div className="form-group">
										<input
											type="text"
											defaultValue=""
											size="35"
											id="contactName"
											name="contactName"
											placeholder="Email Address"
											onChange={handleChange}
										/>
									</div>
									<div className="form-group">
										<input
											type="text"
											defaultValue=""
											size="35"
											id="contactName"
											name="contactName"
											placeholder="Subject"
											onChange={handleChange}
										/>
									</div>
								</div>
								<div style={{width:"60%"}}>
									<div className="form-group">
										<textarea
											cols="50"
											rows="8"
											id="contactMessage"
											name="contactMessage"
											placeholder="Your Message"
										/>
									</div>									
								</div>
							</div>
							<div>
								<button className="submit">Submit</button>
							</div>
						</form>

						<div id="message-warning"> Error boy</div>
						<div id="message-success">
							<i className="fa fa-check"></i>Your message was sent, thank you!
							<br />
						</div>
					</div>
				</Slide>
				<Slide right duration={1000}>
					<aside className="four columns footer-widgets">
						<div className="widget widget_contact">
							<h4>Address and Phone</h4>
							<p className="address">
								{data.name}
								<br />
								{data.address.street}
								<br />
								{data.address.city}, {data.address.state} {data.address.zip}
								<br />
								<span>{data.phone}</span>
							</p>
						</div>
					</aside>
				</Slide>
			</div>
		</section>
	);
}

export default Contact;
