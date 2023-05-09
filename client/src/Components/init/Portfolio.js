import React, { Component } from "react";
import Zmage from "react-zmage";
import Fade from "react-reveal";
import {useSelector} from "react-redux";

let id = 0;

function Portfolio() {

	const data = useSelector(state=>state.tutorials.init_data.portfolio);

	const projects = data.projects.map(function (projects) {
		let projectImage = "images/portfolio/" + projects.image;
		return (
			<div key={id++} className="columns portfolio-item">
				<div className="item-wrap">
					<Zmage alt={projects.title} src={projectImage} />
					<div style={{ textAlign: "center" }}>{projects.title}</div>
				</div>
			</div>
		);
	});

	return (
		<section id="portfolio">
			<Fade bottom duration={1000} distance="200px">
				<div className="row">
					<div className="twelve columns collapsed">
						<h1>Check Out Some of My Works.</h1>

						<div
							id="portfolio-wrapper"
							className="bgrid-quarters s-bgrid-thirds cf"
						>
							{projects}
						</div>
					</div>
				</div>
			</Fade>
		</section>
	);
}

export default Portfolio;
