import * as actions from '../actions/linkedResourcesPage';

const defaultState = {
  showPointModal: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case actions.LINKED_RES_PAGE_SET_MODAL_STATE:
      return {
        ...state,
        showPointModal: action.payload,
      };

    default:
      return state;
  }
}
