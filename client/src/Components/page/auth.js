import React, {useCallback, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {login} from "../../actions/register";
import { useHistory} from "react-router-dom";

const Auth = props => {

    const {children} = props;

    const history = useHistory();
    const dispatch = useDispatch();

    const checkLogin = useCallback(() => {
        if(!localStorage.getItem('auth-token')){
            // history.push('/login');
        }else {
            const token = localStorage.getItem('auth-token');
            dispatch(login(true));
            //history.push('/');
        }
    }, [dispatch, history]);

    useEffect(() => {
        checkLogin();
    });

    return (
        <>
            {children}
        </>
    )
}

export default Auth;