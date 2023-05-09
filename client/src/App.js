import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from './store';
import Routes_component from './routes';
import Auth from "./Components/page/auth";

const App = () =>{
	return(
			<Provider store={store}>
				<BrowserRouter>
					<Auth>
						<Routes_component/>
					</Auth>
				</BrowserRouter>
			</Provider>
	)
}
export default App;