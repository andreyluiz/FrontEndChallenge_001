import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const ActionTypes = {
  FETCH_SURVEYS: 'FETCH_SURVEYS',
  FETCH_SURVEY: 'FETCH_SURVEY',
  SUBMIT_COMPLETIONS: 'SUBMIT_COMPLETIONS'
};

const { FETCH_SURVEYS, FETCH_SURVEY, SUBMIT_COMPLETIONS } = ActionTypes; // for local use

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

export function submitCompletions(id, completions) {
  const request = axios.post(`${API_URL}/survey/${id}/completions`, completions);

  return {
    type: SUBMIT_COMPLETIONS,
    payload: request
  }
}
