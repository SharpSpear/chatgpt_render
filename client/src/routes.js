import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Register from "./Components/page/register";
import Login from "./Components/page/login";
import Survey from "./Components/init/Survey";
import ChatGPT from "./Components/init/ChatGPT";
import Main from './Main';
import { ToastProvider } from 'react-toast-notifications';

const Routes_component = () => {
    console.log("routes");
    return(
        <>
            <ToastProvider>
                <Switch>
                    <Route exact path='/' component={Main} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/survey' component={Survey} />
                    <Route path='/chatgpt' component={ChatGPT} />
                </Switch>
            </ToastProvider>
        </>
    )
}
export default Routes_component;