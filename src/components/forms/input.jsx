import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

const Input = (props) => {
  const {
    fullWidth,
  } = props;

  return (
    <input
      className={cn(styles.input, { [styles.fullWidth]: fullWidth })}
    />
  );
};
Input.propTypes = {
  fullWidth: PropTypes.bool,
};
Input.defaultProps = {
  fullWidth: false,
};

export default Input;
