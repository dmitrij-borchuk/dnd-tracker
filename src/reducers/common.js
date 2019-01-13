const defaultState = {
  testProp: 1,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'setTest':
      return {
        ...state,
        testProp: state.testProp + 1,
      };
    default:
      return state;
  }
}
