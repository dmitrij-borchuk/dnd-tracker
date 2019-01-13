import prod from './prod';
import dev from './dev';

export default function getConfig() {
  if (process.env.NODE_ENV === 'production') {
    return prod;
  }
  return dev;
}
