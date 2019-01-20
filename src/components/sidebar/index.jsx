import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

export const Sidebar = (props) => {
  const {
    children,
    closed,
  } = props;

  return (
    <div className={cn(styles.sidebar, { [styles.closed]: closed })}>
      {children}
    </div>
  );
};
Sidebar.propTypes = {
  children: PropTypes.node,
  closed: PropTypes.bool,
};
Sidebar.defaultProps = {
  children: '',
  closed: false,
};

// TODO: add icon
export const SidebarItem = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.sidebarItem}>
      {children}
    </div>
  );
};
SidebarItem.propTypes = {
  children: PropTypes.node,
};
SidebarItem.defaultProps = {
  children: '',
};
