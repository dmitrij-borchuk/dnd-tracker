import styles from './styles.css';

const KIND = {
  DEFAULT: 'DEFAULT',
  DANGER: 'DANGER',
};

export default KIND;

export const kind2class = {
  [KIND.PRIMARY]: styles.primary,
  [KIND.DANGER]: styles.danger,
};
