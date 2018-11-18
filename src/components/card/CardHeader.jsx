import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const CardHeader = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.cardHeader}>
      {children}
    </div>
  );
};
CardHeader.propTypes = {
  children: PropTypes.node,
};
CardHeader.defaultProps = {
  children: '',
};

export default CardHeader;
