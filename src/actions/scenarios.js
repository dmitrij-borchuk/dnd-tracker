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

export const RESET_SCENARIO_LIST = 'RESET_SCENARIO_LIST';
export const resetScenarioList = () => ({
  type: RESET_SCENARIO_LIST,
});

export const GET_SCENARIOS = 'GET_SCENARIOS';
export const getScenarios = campaignId => ({
  type: GET_SCENARIOS,
  payload: campaignId,
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


export const REMOVE_SCENARIO = 'REMOVE_SCENARIO';
export const removeScenario = data => ({
  type: REMOVE_SCENARIO,
  payload: data,
});

export const REMOVE_SCENARIO_FAILED = 'REMOVE_SCENARIO_FAILED';
export const removeScenarioFailed = data => ({
  type: REMOVE_SCENARIO_FAILED,
  payload: data,
});

export const REMOVE_SCENARIO_SUCCESS = 'REMOVE_SCENARIO_SUCCESS';
export const removeScenarioSuccess = data => ({
  type: REMOVE_SCENARIO_SUCCESS,
  payload: data,
});
