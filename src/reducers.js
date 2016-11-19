import { combineReducers } from 'redux';
import { ActionTypes } from './actions'
const { FETCH_SURVEYS } = ActionTypes

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
    default:
      return state;
  };
}

const appReducer = combineReducers({
  surveys: surveysReducer
});

export default appReducer;
