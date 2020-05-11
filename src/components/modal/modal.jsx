import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

const Modal = (props) => {
  const {
    children,
  } = props;
  return (
    <div className={cn(styles.overlay)}>
      <div className={cn(styles.modalScroll)}>
        <div className={cn(styles.modal)}>
          {children}
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
