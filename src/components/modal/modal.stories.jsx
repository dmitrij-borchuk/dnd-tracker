import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalControls,
  MODAL_KIND,
} from './index';
import { Button } from '../button';

const label = 'Kind';
const options = Object.keys(MODAL_KIND);

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .add('default', () => <Modal><ModalBody>Modal content</ModalBody></Modal>)
  .add('With header', () => (
    <Modal>
      <ModalHeader kind={select(label, options, MODAL_KIND.PRIMARY)}>Header</ModalHeader>
      <ModalBody>Modal content</ModalBody>
    </Modal>
  ))
  .add('With controls', () => (
    <Modal>
      <ModalHeader kind={select(label, options, MODAL_KIND.PRIMARY)}>Header</ModalHeader>
      <ModalBody>Modal content</ModalBody>
      <ModalControls>
        <Button onClick={action('Cancel click')}>Cancel</Button>
        <Button onClick={action('Ok click')}>Ok</Button>
      </ModalControls>
    </Modal>
  ));
