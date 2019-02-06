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
    className,
  } = props;

  return (
    <button
      type="button"
      className={cn(styles.btn, kind2class[kind], className)}
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
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  onClick: () => {},
  kind: KIND.PRIMARY,
  disabled: false,
  className: '',
};

export default Button;
