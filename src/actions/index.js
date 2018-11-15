export const GET_SCENARIOS = 'GET_SCENARIOS';
export const getScenarios = () => ({
  type: GET_SCENARIOS,
  firebase: {
    path: 'scenario',
  },
});
