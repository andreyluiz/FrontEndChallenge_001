import { combineReducers } from 'redux';
import { ActionTypes } from './actions'
import { reducer as formReducer } from 'redux-form'
const { FETCH_SURVEYS, FETCH_SURVEY, SUCCESS_MESSAGE } = ActionTypes

const INITIAL_STATE = {
  all: [],
  survey: null,
  lastUpdated: null
};

function surveysReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return { 
        ...state, 
        all: action.payload.data 
      };
    case FETCH_SURVEY:
      return {
        ...state,
        survey: action.payload.data
      }
    case SUCCESS_MESSAGE: 
      return Object.assign({}, state, {
        showSuccessMessage: action.show
      })
    default:
      return state;
  };
}

const appReducer = combineReducers({
  surveys: surveysReducer,
  form: formReducer
});

export default appReducer;
