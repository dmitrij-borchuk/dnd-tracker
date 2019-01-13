import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

export const TYPES = {
  DANGER: 'danger',
  PRIMARY: 'primary',
};

const types2class = {
  [TYPES.DANGER]: styles.danger,
  [TYPES.PRIMARY]: styles.primary,
};

const Alert = (props) => {
  const {
    children,
    type,
  } = props;

  return (
    <div className={cn(styles.alert, types2class[type])}>
      {children}
    </div>
  );
};
Alert.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};
Alert.defaultProps = {
  type: TYPES.PRIMARY,
};

export default Alert;
