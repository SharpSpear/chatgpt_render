import React from "react";
import Fade from "react-reveal";
import {useSelector} from "react-redux";

function Footer() {

	const data = useSelector(state=>state.tutorials.init_data.main);

	const networks = data.social.map(function (network) {
		return (
			<li key={network.name}>
				<a href={network.url}>
					<i className={network.className}></i>
				</a>
			</li>
		);
	});

	return (
		<footer>
			<div className="row">
				<Fade bottom>
					<div className="twelve columns">
						<ul className="social-links">{networks}</ul>
						<ul className="copyright"  style={{color:"white"}}>
							<li>&copy; Copyright 2023 Custom ChatGPT</li>
							<li>
								Design by{" "} Maksim Kholin
							</li>
						</ul>
					</div>
				</Fade>
				<div id="go-top">
					<a className="smoothscroll" title="Back to Top" href="#home">
						<i className="icon-up-open"></i>
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
