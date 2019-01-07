import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

const CardHeader = (props) => {
  const {
    children,
    className,
    flex,
  } = props;
  const classNames = cn(
    styles.cardHeader,
    {
      [styles.headerFlex]: flex,
    },
    className,
  );

  return (
    <div className={classNames}>
      {children}
    </div>
  );
};
CardHeader.propTypes = {
  children: PropTypes.node,
  flex: PropTypes.bool,
  className: PropTypes.string,
};
CardHeader.defaultProps = {
  children: '',
  className: '',
  flex: false,
};

export default CardHeader;
