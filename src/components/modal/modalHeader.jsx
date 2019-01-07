import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';
import KIND from './kind';

const kind2class = {
  [KIND.PRIMARY]: styles.primary,
  [KIND.DANGER]: styles.danger,
};

const ModalHeader = (props) => {
  const {
    children,
    kind,
  } = props;

  return (
    <div className={cn(styles.header, kind2class[kind])}>
      {children}
    </div>
  );
};
ModalHeader.propTypes = {
  children: PropTypes.node.isRequired,
  kind: PropTypes.string,
};
ModalHeader.defaultProps = {
  kind: KIND.PRIMARY,
};

export default ModalHeader;
