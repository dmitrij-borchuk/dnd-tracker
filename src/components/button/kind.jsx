import styles from './styles.css';

const KIND = {
  PRIMARY: 'PRIMARY',
  DANGER: 'DANGER',
  GHOST: 'GHOST',
};

export default KIND;

export const kind2class = {
  [KIND.PRIMARY]: styles.primary,
  [KIND.DANGER]: styles.danger,
  [KIND.GHOST]: styles.ghost,
};
