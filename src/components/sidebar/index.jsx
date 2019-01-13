import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

export const Sidebar = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.sidebar}>
      {children}
    </div>
  );
};
Sidebar.propTypes = {
  children: PropTypes.node,
};
Sidebar.defaultProps = {
  children: '',
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
