import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

const InputWithLabel = (props) => {
  const {
    fullWidth,
    label,
    id,
  } = props;

  return (
    <label
      htmlFor={id}
      className={cn(styles.formGroup, { [styles.fullWidth]: fullWidth })}
    >
      <div className={styles.label}>
        {label}
      </div>
      <input
        type="text"
        id={id}
        className={cn(styles.input, { [styles.fullWidth]: fullWidth })}
      />
    </label>
  );
};
InputWithLabel.propTypes = {
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.string,
};
InputWithLabel.defaultProps = {
  fullWidth: false,
  label: '',
  id: '',
};

export default InputWithLabel;
