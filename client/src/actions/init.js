import {
    INIT_DATA,
    SURVEY_DATA
} from "./types";

export const init_data = (data) =>  (dispatch) => {
    dispatch({
        type: INIT_DATA,
        payload: data
    });
};

export const Survey_data = (data) =>  (dispatch) => {
    console.log("action", data);
    dispatch({
        type: SURVEY_DATA,
        payload: data
    });
};