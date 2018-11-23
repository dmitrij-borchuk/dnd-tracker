export const GET_SCENARIOS = 'GET_SCENARIOS';
export const getScenarios = () => ({
  type: GET_SCENARIOS,
  firebase: {
    path: 'scenario',
    method: 'get',
  },
});

export const SET_SCENARIOS = 'SET_SCENARIOS';
export const setScenarios = data => ({
  type: SET_SCENARIOS,
  payload: data,
});

export const SAVE_SCENARIO = 'SAVE_SCENARIO';
export const saveScenario = data => ({
  type: SAVE_SCENARIO,
  firebase: {
    path: 'scenario',
    method: 'save',
  },
  payload: data,
});
