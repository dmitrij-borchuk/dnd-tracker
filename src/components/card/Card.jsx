import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

const Card = (props) => {
  const {
    children,
    className,
  } = props;

  return (
    <div className={cn(styles.cardContainer, className)}>
      {children}
    </div>
  );
};
Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
Card.defaultProps = {
  children: '',
  className: '',
};

export default Card;
