import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

const ModalBody = (props) => {
  const {
    children,
  } = props;
  return (
    <div className={cn(styles.body)}>
      {children}
    </div>
  );
};
ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalBody;
