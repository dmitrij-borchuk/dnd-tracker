import React from 'react';
import ReactQuill from 'react-quill';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import '!style-loader!css-loader!react-quill/dist/quill.snow.css';

const RichText = props => (
  <ReactQuill {...props} />
);

export default RichText;
