import React, {useState, useEffect} from "react";
import Fade from "react-reveal";
import {useSelector} from "react-redux";

function About() {

	const data = useSelector(state=>state.tutorials.init_data.main);

	return (
		<section id="about">
			<Fade right duration={1000}>
				<div className="row">
					<div className="columns">
						<img
						className="profile-pic"
						src={"images/" + data.image}
						alt="Nordic Giant Profile Pic"
						/>
					</div>
					<div className="nine columns main-col">
						<h2>About Me</h2>
						<p>{data.bio}</p>
						<div className="row">
							<div className="columns contact-details">
								<h2>Contact Details</h2>
								<p className="address">
								<span>{data.name}</span>
								<br />
								<span>
									{data.address.street}
									<br />
									{data.address.city} {data.address.state}, {data.address.zip}
								</span>
								<br />
								<span>{data.phone}</span>
								<br />
								<span>{data.email}</span>
								</p>
							</div>
							<div className="columns download">
								<p>
								<a href={data.resumeDownload} className="button">
									<i className="fa fa-download"></i>Download Resume
								</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</Fade>
		</section>
	);
};

export default About;
