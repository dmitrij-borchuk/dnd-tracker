import todosRef from '../utils/firebase';

const FETCH_TODOS = 'FETCH_TODOS';

export const fetchToDos = () => async (dispatch) => {
  todosRef.on('value', (snapshot) => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val(),
    });
  });
};

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


// export const addToDo = newToDo => async dispatch => {
//   todosRef.push().set(newToDo);
// };

// export const completeToDo = completeToDoId => async dispatch => {
//   todosRef.child(completeToDoId).remove();
// };
