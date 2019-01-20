import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { Sidebar, SidebarItem } from './index';

storiesOf('Sidebar', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Sidebar
      opened={boolean('Opened', true)}
    >
      <SidebarItem>
        {text('Item 1 text', 'Item 1')}
      </SidebarItem>
      <SidebarItem>
        {text('Item 2 text', 'Item 2')}
      </SidebarItem>
    </Sidebar>
  ));
