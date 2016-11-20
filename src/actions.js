import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const ActionTypes = {
  FETCH_SURVEYS: 'FETCH_SURVEYS',
  FETCH_SURVEY: 'FETCH_SURVEY',
  SUBMIT_COMPLETIONS: 'SUBMIT_COMPLETIONS',
  SUCCESS_MESSAGE: 'SUCCESS_MESSAGE',
  SUBMIT_MESSAGE: 'SUBMIT_MESSAGE'
};

const { FETCH_SURVEYS, FETCH_SURVEY, SUBMIT_COMPLETIONS, SUCCESS_MESSAGE, SUBMIT_MESSAGE } = ActionTypes; // for local use

export function fetchSurveys() {
  const request = axios.get(`${API_URL}/surveys`);

  return {
    type: FETCH_SURVEYS,
    payload: request
  };
};

export function fetchSurvey(id) {
  const request = axios.get(`${API_URL}/surveys/${id}`);

  return {
    type: FETCH_SURVEY,
    payload: request
  };
}

export function submitCompletions(id, completions) {

  let payload = []
  for (const question_id in completions) {
    if (completions.hasOwnProperty(question_id)) {
      payload.push({
        question_id,
        value: completions[question_id]
      })
    }
  }

  const request = axios.post(`${API_URL}/surveys/${id}/completions`, completions);

  return {
    type: SUBMIT_COMPLETIONS,
    payload: request
  }
}

export function successMessage(show) {
  return {
    type: SUCCESS_MESSAGE,
    show
  }
}

export function submitMessage(show) {
  return {
    type: SUBMIT_MESSAGE,
    show
  };
}
