import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

const CardHeader = (props) => {
  const {
    children,
    flex,
  } = props;
  const className = cn(styles.cardHeader, {
    [styles.headerFlex]: flex,
  });

  return (
    <div className={className}>
      {children}
    </div>
  );
};
CardHeader.propTypes = {
  children: PropTypes.node,
  flex: PropTypes.bool,
};
CardHeader.defaultProps = {
  children: '',
  flex: false,
};

export default CardHeader;
