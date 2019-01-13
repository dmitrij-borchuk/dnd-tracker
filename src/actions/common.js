export const REDIRECT = 'REDIRECT';
export const redirect = data => ({
  type: REDIRECT,
  payload: data,
});

export const SETUP_APP = 'SETUP_APP';
export const setupApp = data => ({
  type: SETUP_APP,
  payload: data,
});
