import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

const ModalControls = (props) => {
  const {
    children,
  } = props;
  return (
    <div className={cn(styles.controls)}>
      {children}
    </div>
  );
};
ModalControls.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalControls;
