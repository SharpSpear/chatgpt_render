import React from "react";
import "./App.css";
import Header from "./Components/init/Header";
import Footer from "./Components/init/Footer";
import About from "./Components/init/About";
import Contact from "./Components/init/Contact";	
import Portfolio from "./Components/init/Portfolio";
import {useSelector} from "react-redux";
// import "./default.css";

const Main = () => {

	const isLogin = useSelector(state=>state.tutorials.login);
	const flag = useSelector(state=>state.tutorials.flag);

	return (
		<div>
			<Header/>
			{isLogin ? 
				<>
					<About/>
					<Portfolio/>
					<Contact/>
					<Footer/>
				</> : <></>
			}				
		</div>
	);
}
  
export default Main;

