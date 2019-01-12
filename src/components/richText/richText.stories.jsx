import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RichText from './index';

storiesOf('RichText', module)
  .add('default', () => (
    <RichText
      value="<h1>Test</h1>"
      onChange={action('onTextChanged')}
    />
  ));
