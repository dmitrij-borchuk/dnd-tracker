import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const ListItem = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.listItem}>
      {children}
    </div>
  );
};
ListItem.propTypes = {
  children: PropTypes.node,
};
ListItem.defaultProps = {
  children: '',
};

export default ListItem;
