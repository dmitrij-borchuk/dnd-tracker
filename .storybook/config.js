import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import '!style-loader!css-loader!../src/styles.css';

addDecorator(
  withInfo({
    header: false,
    inline: true,
  })
);

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories.jsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
