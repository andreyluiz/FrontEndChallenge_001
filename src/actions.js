import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const ActionTypes = {
  FETCH_SURVEYS: 'FETCH_SURVEYS',
  FETCH_SURVEY: 'FETCH_SURVEY'
};

const { FETCH_SURVEYS, FETCH_SURVEY } = ActionTypes; // for local use

export function fetchSurveys() {
  const request = axios.get(`${API_URL}/surveys`);

  return {
    type: FETCH_SURVEYS,
    payload: request
  };
};

export function fetchSurvey(id) {
  const request = axios.get(`${API_URL}/survey/${id}`);

  return {
    type: FETCH_SURVEY,
    payload: request
  };
}
