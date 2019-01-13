import prod from './prod';
import dev from './dev';

export default function getConfig() {
  console.log('=-= process.env.projectId', process.env.projectId)
  console.log('=-= process.env', process.env)
  if (process.env.NODE_ENV === 'production') {
    return prod;
  }
  return dev;
}
