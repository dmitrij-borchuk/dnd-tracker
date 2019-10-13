import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

// Get the current location.
export const getLocation = () => history.location;

// Listen for changes to the current location.
// Arguments:
//   (location, action) => {} - returns unlisten() function
// location is an object like window.location
export const subscribeToHistory = cb => history.listen(cb);

// Use push, replace, and go to navigate around.
export const push = (location, ...other) => history.push(location, ...other);
