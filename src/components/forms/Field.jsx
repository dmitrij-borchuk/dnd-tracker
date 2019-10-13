import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

export const Field = (props) => {
  const {
    fullWidth,
    label,
    id,
    value,
    onChange,
    type,
    error,
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
        type={type}
        id={id}
        className={cn(styles.input, { [styles.fullWidth]: fullWidth })}
        value={value}
        onChange={onChange}
      />
      <div className={styles.error}>{error}</div>
    </label>
  );
};
Field.propTypes = {
  error: PropTypes.node,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};
Field.defaultProps = {
  error: '',
  fullWidth: false,
  label: '',
  id: '',
  value: '',
  type: 'text',
  onChange: () => { },
};
