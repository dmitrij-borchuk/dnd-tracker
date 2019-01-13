export const SIGN_IN = 'SIGN_IN';
export const signIn = () => ({
  type: SIGN_IN,
});

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => ({
  type: SIGN_OUT,
});

export const SET_USER = 'SET_USER';
export const setUser = data => ({
  type: SET_USER,
  payload: data,
});
