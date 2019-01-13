import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Page = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.pageContent}>
      {children}
    </div>
  );
};
Page.propTypes = {
  children: PropTypes.node,
};
Page.defaultProps = {
  children: '',
};

export default Page;
