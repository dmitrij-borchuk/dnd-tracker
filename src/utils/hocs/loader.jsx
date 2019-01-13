import React from 'react';
import Loader from '../../components/loader';

const loaderHoc = config => Component => (props) => {
  config.init(props);
  const loaded = config.check(props);

  if (!loaded) {
    return (<Loader fillParent />);
  }
  return <Component {...props} />;
};

export default loaderHoc;
