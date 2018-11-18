import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const CardBody = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.cardBody}>
      {children}
    </div>
  );
};
CardBody.propTypes = {
  children: PropTypes.node,
};
CardBody.defaultProps = {
  children: '',
};

export default CardBody;
