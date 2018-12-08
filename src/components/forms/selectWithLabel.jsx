import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

const SelectWithLabel = (props) => {
  const {
    fullWidth,
    label,
    id,
    value,
    onChange,
    options,
  } = props;

  return (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label
      htmlFor={id}
      className={cn(styles.formGroup, { [styles.fullWidth]: fullWidth })}
    >
      <div className={styles.label}>
        {label}
      </div>
      <select
        id={id}
        className={cn(styles.input, { [styles.fullWidth]: fullWidth })}
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <option
            value={option.value}
            key={option.value}
          >
            {option.text}
          </option>
        ))}
      </select>
    </label>
  );
};
SelectWithLabel.propTypes = {
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
};
SelectWithLabel.defaultProps = {
  fullWidth: false,
  label: '',
  id: '',
  value: '',
  onChange: () => {},
};

export default SelectWithLabel;
