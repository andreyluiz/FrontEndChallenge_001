import { combineReducers } from 'redux';
import { ActionTypes } from './actions'
import { reducer as formReducer } from 'redux-form'
const { FETCH_SURVEYS, FETCH_SURVEY, SUCCESS_MESSAGE, SUBMIT_MESSAGE } = ActionTypes

const INITIAL_STATE = {
  all: [],
  survey: null,
  lastUpdated: null,
  showSuccessMessage: false,
  showSubmitMessage: false
};

function surveysReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return { 
        ...state, 
        all: action.payload.data.surveys
      };
    case FETCH_SURVEY:
      return {
        ...state,
        survey: action.payload.data.survey
      }
    case SUCCESS_MESSAGE: 
      return Object.assign({}, state, {
        showSuccessMessage: action.show
      })
    case SUBMIT_MESSAGE:
      return Object.assign({}, state, {
        showSubmitMessage: action.show
      })
    default:
      return state;
  }
}

const appReducer = combineReducers({
  surveys: surveysReducer,
  form: formReducer
});

export default appReducer;
