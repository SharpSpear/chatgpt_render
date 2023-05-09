import {
  INIT_DATA,
	LOGIN,
  SURVEY_DATA
  } from "../actions/types";
import initData from "../resumeData.json";

  const initialState = {
    init_data: initData,
	  login: false,
    surveyData: {},
    flag: false
  };

  const tutorialReducer = function(state = initialState, action) {
    switch (action.type) {
      case INIT_DATA:{
        return {
          ...state,
          init_data : action.payload,
        }
      }
	  case LOGIN:{
        return {
          ...state,
          login : action.payload,
        }
      }
      case SURVEY_DATA:{
        return {
          ...state,
          surveyData : action.payload,
          flag: true
        }
      }
      default:
        return state;
    }
  };
  export default tutorialReducer;