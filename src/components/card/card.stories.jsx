import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Card, CardHeader, CardBody } from './index';

storiesOf('Card', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Card>
      <CardHeader>
        Header
      </CardHeader>
      <CardBody>
        Content
      </CardBody>
    </Card>
  ));
