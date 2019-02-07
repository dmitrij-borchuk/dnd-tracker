import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import PointModal from './index';

storiesOf('PointModal', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <PointModal
      onEdit={action('onEdit')}
      onClose={action('onClose')}
      data={{
        name: 'Some point',
        description: '<p>Some point <strong>description</strong></p>',
      }}
    />
  ));
