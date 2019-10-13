const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

dotenv.config();

const envKeys = Object.keys(process.env).reduce((prev, next) => {
  // prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
  return {
    ...prev,
    [`process.env.${next}`]: JSON.stringify(process.env[next]),
  };
}, {});

module.exports = {
  entry: ['@babel/polyfill', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin(envKeys),
    new CopyWebpackPlugin([
      './_redirects',
    ]),
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
    extensions: ['.json', '.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              exportOnlyLocals: true,
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
      { test: /\.(ts|tsx)?$/, use: 'awesome-typescript-loader' },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
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
