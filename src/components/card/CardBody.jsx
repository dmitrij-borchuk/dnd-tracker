import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

const CardBody = (props) => {
  const {
    children,
    className,
  } = props;

  return (
    <div className={cn(styles.cardBody, className)}>
      {children}
    </div>
  );
};
CardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
CardBody.defaultProps = {
  children: '',
  className: '',
};

export default CardBody;
