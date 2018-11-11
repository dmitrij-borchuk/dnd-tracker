if (process.env.NODE_ENV === 'production') {
  module.exports = import('./prod');
} else {
  module.exports = import('./dev');
}
