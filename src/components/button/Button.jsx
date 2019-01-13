import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';
import KIND, { kind2class } from './kind';

const Button = (props) => {
  const {
    children,
    onClick,
    kind,
    disabled,
  } = props;

  return (
    <button
      type="button"
      className={cn(styles.btn, kind2class[kind])}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  kind: PropTypes.string,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  onClick: () => {},
  kind: KIND.DEFAULT,
  disabled: false,
};

export default Button;
