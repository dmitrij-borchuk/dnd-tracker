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
  } = props;

  return (
    <button
      type="button"
      className={cn(styles.btn, kind)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
SmallButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  kind: PropTypes.string,
};
SmallButton.defaultProps = {
  children: '',
  onClick: () => {},
  kind: KIND.DEFAULT,
};

export default SmallButton;
