// eslint-disable-next-line import/prefer-default-export
export const arrayToMap = arr => arr.reduce((acc, item) => ({
  ...acc,
  [item.id]: item,
}), {});
