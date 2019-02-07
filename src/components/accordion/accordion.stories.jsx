import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { CollapsibleBlock, Accordion } from './index';

storiesOf('Accordion', module)
  .addDecorator(withKnobs)
  .add('CollapsibleBlock', () => (
    <CollapsibleBlock
      isOpened={boolean('Opened', true)}
    >
      Content
    </CollapsibleBlock>
  ))
  .add('Accordion', () => (
    <Accordion title="Header">
      Content
    </Accordion>
  ));
