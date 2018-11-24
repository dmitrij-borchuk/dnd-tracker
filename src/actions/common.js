export const REDIRECT = 'REDIRECT';
export const redirect = data => ({
  type: REDIRECT,
  payload: data,
});
