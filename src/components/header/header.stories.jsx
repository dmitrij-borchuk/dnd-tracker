import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import Header from './index';

storiesOf('Header', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Header
      title={text('Title', 'DnD Tracker')}
      onSignIn={action('Sign in clicked')}
    />
  ))
  .add('signed in', () => (
    <Header
      title={text('Title', 'DnD Tracker')}
      user={{}}
      onSignOut={action('Sign out clicked')}
    />
  ));
