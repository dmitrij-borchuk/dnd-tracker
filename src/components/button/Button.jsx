import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';
import KIND from './kind';

const SmallButton = (props) => {
  const {
    children,
    onClick,
    kind,
    disabled,
  } = props;

  return (
    <button
      type="button"
      className={cn(styles.btn, kind)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
SmallButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  kind: PropTypes.string,
  disabled: PropTypes.bool,
};
SmallButton.defaultProps = {
  children: '',
  onClick: () => {},
  kind: KIND.DEFAULT,
  disabled: false,
};

export default SmallButton;
