import {
    LOGIN,
} from "./types";

export const login = (flag) => async (dispatch) => {
    dispatch({
        type: LOGIN,
        payload: flag,
    });
};



// export const sign_up = (data, history) => async (dispatch) => {
//     try {
//         const res = await Register.signup(data);
//         console.log("aaaaaaaaaaaaaaaaaa",res.data);
//         //history.push('/signin');
        
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };
// export const sign_in = (data, history) => async (dispatch) => {
//     try {
//         const res = await Register.signin(data);
//         console.log("bbbbbbbbbbbbbbbbbbbbb",data);
//         //history.push('/signin');
        
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };