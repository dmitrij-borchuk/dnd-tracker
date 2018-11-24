import { push } from './history';
import { REDIRECT } from '../actions/common';

export default function routingMiddleware() {
  return next => (action) => {
    switch (action.type) {
      case REDIRECT:
        return push(action.payload);

      default:
        break;
    }
    return next(action);
  };
}
