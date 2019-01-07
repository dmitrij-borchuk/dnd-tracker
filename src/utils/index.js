// eslint-disable-next-line import/prefer-default-export
export const stopPropagation = fn => (e) => {
  fn();
  e.stopPropagation();
};
