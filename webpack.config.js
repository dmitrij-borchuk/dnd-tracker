const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // new SWPrecacheWebpackPlugin(
    //   {
    //     cacheId: 'ketchup',
    //     filename: 'serviceWorker.js',
    //     minify: true,
    //     navigateFallback: '/index.html',
    //     staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    //   },
    // ),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 8082,
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(webmanifest|mp3)$/i,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
};
