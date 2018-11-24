import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

const ListItem = (props) => {
  const {
    children,
    className,
    onClick,
  } = props;

  return (
    <div
      className={cn(styles.listItem, className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
ListItem.defaultProps = {
  children: '',
  className: '',
  onClick: () => {},
};

export default ListItem;
