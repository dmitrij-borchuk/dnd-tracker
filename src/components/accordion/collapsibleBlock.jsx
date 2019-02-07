import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const CollapsibleBlock = (props) => {
  const {
    children,
    isOpened,
  } = props;
  const containerRef = useRef(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    setHeight(containerRef.current.offsetHeight);
  }, []);

  return (
    <div
      className={styles.container}
      ref={containerRef}
      style={{
        height: isOpened ? height : 0,
      }}
    >
      {children}
    </div>
  );
};
CollapsibleBlock.propTypes = {
  children: PropTypes.node.isRequired,
  isOpened: PropTypes.bool,
};
CollapsibleBlock.defaultProps = {
  isOpened: true,
};

export default CollapsibleBlock;
