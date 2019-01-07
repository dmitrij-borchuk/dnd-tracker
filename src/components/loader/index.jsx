import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

const Loader = (props) => {
  const {
    fillParent,
  } = props;

  return (
    <div className={cn(styles.loader, { [styles.fillParent]: fillParent })} />
  );
};
Loader.propTypes = {
  fillParent: PropTypes.bool.isRequired,
};

export default Loader;
