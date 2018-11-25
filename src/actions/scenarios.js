export const FETCH_SCENARIO = 'FETCH_SCENARIO';
export const fetchScenario = data => ({
  type: FETCH_SCENARIO,
  payload: data,
});

export const SET_SCENARIO = 'SET_SCENARIO';
export const setScenario = data => ({
  type: SET_SCENARIO,
  payload: data,
});

export const RESET_SCENARIO = 'RESET_SCENARIO';
export const resetScenario = () => ({
  type: RESET_SCENARIO,
});

export const GET_SCENARIOS = 'GET_SCENARIOS';
export const getScenarios = () => ({
  type: GET_SCENARIOS,
});

export const SET_SCENARIOS = 'SET_SCENARIOS';
export const setScenarios = data => ({
  type: SET_SCENARIOS,
  payload: data,
});

export const SAVE_SCENARIO = 'SAVE_SCENARIO';
export const saveScenario = data => ({
  type: SAVE_SCENARIO,
  payload: data,
});

export const SAVE_SCENARIO_FAILED = 'SAVE_SCENARIO_FAILED';
export const saveScenarioFailed = data => ({
  type: SAVE_SCENARIO_FAILED,
  payload: data,
});
