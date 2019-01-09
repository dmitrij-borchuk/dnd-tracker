import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.css';

const Label = (props) => {
  const { children } = props;

  return (
    <div className={cn(styles.label)}>
      {children}
    </div>
  );
};
Label.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Label;
