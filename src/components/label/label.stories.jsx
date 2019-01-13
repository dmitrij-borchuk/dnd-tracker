import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Label from './index';

const label = 'Text';

storiesOf('Label', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Label>
      {text(label, 'Description')}
    </Label>
  ));
