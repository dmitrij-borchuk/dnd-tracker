import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select } from '@storybook/addon-knobs';
import {
  Button,
  SmallButton,
  KIND,
} from './index';

const label = 'Kind';
const options = [
  KIND.DEFAULT,
  KIND.DANGER,
];

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Button
      onClick={action('Clicked')}
      kind={select(label, options, KIND.DEFAULT)}
    >
      Click me
    </Button>
  ))
  .add('small', () => (
    <SmallButton
      onClick={action('Clicked')}
      kind={select(label, options, KIND.DEFAULT)}
    >
      Click me
    </SmallButton>
  ));
