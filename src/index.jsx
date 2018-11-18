import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// import { createMuiTheme } from '@material-ui/core/styles';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import 'normalize.css';
import './styles.css';
import reducers from './reducers';
import App from './components/App';
import localStorageMiddleware from './utils/localStorageMiddleware';
import firebaseMiddleware from './utils/firebaseMiddleware';
// import initServiceWorker from './utils/serviceWorkerInstaller';
import 'normalize.css';

// const theme = createMuiTheme({
//   palette: {
//     type: 'dark',
//   },
// });

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(
    // thunk,
    localStorageMiddleware,
    firebaseMiddleware,
  )),
);

// eslint-disable-next-line no-undef
const root = document.getElementById('root');

// {/* <MuiThemeProvider theme={theme}>
//   <App />
// </MuiThemeProvider> */}
render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
);

// initServiceWorker();
