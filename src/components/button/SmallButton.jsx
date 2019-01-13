import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';
import KIND, { kind2class } from './kind';

const SmallButton = (props) => {
  const {
    children,
    onClick,
    kind,
  } = props;

  return (
    <button
      type="button"
      className={cn(styles.btn, styles.small, kind2class[kind])}
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
