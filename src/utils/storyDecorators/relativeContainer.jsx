import React from 'react';

export default config => (story) => {
  const styles = {
    position: 'relative',
    height: config.height,
  };
  return (
    <div style={styles}>
      {story()}
    </div>
  );
};
