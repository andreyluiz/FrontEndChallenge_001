import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const ActionTypes = {
  FETCH_SURVEYS: 'FETCH_SURVEYS'
};

const { FETCH_SURVEYS } = ActionTypes; // for local use

export function fetchSurveys() {
  const request = axios.get(`${API_URL}/surveys`);

  return {
    type: FETCH_SURVEYS,
    payload: request
  };
};
