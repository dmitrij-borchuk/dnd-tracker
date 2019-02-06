import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import EditPoint from './index';

storiesOf('EditPoint', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <EditPoint
      onSave={action('onSave')}
      onCancel={action('onCancel')}
      data={{
        name: 'Some point',
        description: '<p>Some point <strong>description</strong></p>',
      }}
    />
  ));
