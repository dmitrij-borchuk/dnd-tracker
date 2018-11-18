import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const List = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.listContainer}>
      {children}
    </div>
  );
};
List.propTypes = {
  children: PropTypes.node,
};
List.defaultProps = {
  children: '',
};

export default List;
