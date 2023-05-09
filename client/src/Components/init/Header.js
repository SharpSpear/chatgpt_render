import React from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";
import {useSelector, useDispatch} from "react-redux";
import { useHistory} from "react-router-dom";
import {login} from "../../actions/register";

function Header() {

	const data = useSelector(state=>state.tutorials.init_data.main);
	const isLogin = useSelector(state=>state.tutorials.login);
	const history = useHistory();
	const dispatch = useDispatch();

	const logout = () =>{
		dispatch(login(false));
		localStorage.removeItem('auth-token');
		history.push('/');
	}

	return (
		<header id="home">
			<ParticlesBg type="circle" bg={true} />
			{isLogin ? 
				<nav id="nav-wrap">				
					<ul id="nav" className="nav">
						<li className="current">
							<a className="smoothscroll" href="#home">
								Home
							</a>
						</li>

						<li>
							<a className="smoothscroll" href="#about">
								About
							</a>
						</li>

						<li>
							<a  href="/survey">
								Survey
							</a>
						</li>

						<li>
							<a  href="/chatgpt">
								ChatGPT
							</a>
						</li>

						<li>
							<a className="smoothscroll" href="#portfolio">
								Works
							</a>
						</li>
						<li>
							<a className="smoothscroll" href="#contact">
								Contact
							</a>
						</li>
						<li style={{float:"right"}}>
							<a href="/" onClick={logout}>
								Log out
							</a>
						</li>
					</ul>
				</nav> : <nav id="nav-wrap">				
					<ul id="nav" className="nav" style={{float:"right"}}>
						<li>
							<Link to="/register">Register</Link>
						</li>
						<li>
							<a href="/login">
								Log in
							</a>
						</li>
						</ul>
				</nav>
			}
			<div className="row banner">
				<div className="banner-text">
					<Fade bottom>
						<h1 className="responsive-headline">{data.name}</h1>
					</Fade>
					<Fade bottom duration={1200}>
						<h3>{data.description}.</h3>
					</Fade>
					<hr />
					{/* <Fade bottom duration={2000}>
						{!isLogin ? 
							<ul className="social">
								<a href="/register" className="button btn project-btn">
									<i className="fa fa-book"></i>Register
								</a>
								<a href="/login" className="button btn github-btn">
									<i className="fa fa-github"></i>Log in
								</a>
							</ul> : 
							<ul className="social">
								<button onClick={logout} className="button btn project-btn">
									<i className="fa fa-book"></i>Log out
								</button>
							</ul>
							}
					</Fade> */}
				</div>
			</div>
			<p className="scrolldown">
				<a className="smoothscroll" href="#about">
					<i className="icon-down-circle"></i>
				</a>
			</p>
		</header>
	);
}

export default Header;
