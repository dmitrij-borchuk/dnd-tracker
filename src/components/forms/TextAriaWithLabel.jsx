import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

const TextAriaWithLabel = (props) => {
  const {
    fullWidth,
    label,
    id,
    value,
    onChange,
  } = props;

  return (
    <label
      htmlFor={id}
      className={cn(styles.formGroup, { [styles.fullWidth]: fullWidth })}
    >
      <div className={styles.label}>
        {label}
      </div>
      <textarea
        type="text"
        id={id}
        className={cn(styles.input, { [styles.fullWidth]: fullWidth })}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
TextAriaWithLabel.propTypes = {
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
TextAriaWithLabel.defaultProps = {
  fullWidth: false,
  label: '',
  id: '',
  value: '',
  onChange: () => {},
};

export default TextAriaWithLabel;
