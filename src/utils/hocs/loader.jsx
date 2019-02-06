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

export const loaderHoc2 = initFn => Component => (props) => {
  const check = initFn(props);
  const loaded = check(props);

  if (!loaded) {
    return (<Loader fillParent />);
  }
  return <Component {...props} />;
};

export default loaderHoc;
