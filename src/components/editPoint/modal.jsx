import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, KIND as BTN_KIND } from '../button';
import RichText from '../richText';
import Label from '../label';
import { InputWithLabel } from '../forms';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalControls,
} from '../modal';

const EditPointModal = (props) => {
  const {
    onSave,
    onCancel,
    data,
  } = props;
  const [name, setName] = useState(data.name || '');
  const [description, setDescription] = useState(data.description || '');

  return (
    <Modal>
      <ModalHeader>Edit point</ModalHeader>
      <ModalBody>
        <InputWithLabel
          label="Name"
          id="name"
          key="name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
        />
        <Label>Description</Label>
        <RichText
          value={description}
          onChange={setDescription}
        />
      </ModalBody>
      <ModalControls>
        <Button
          kind={BTN_KIND.DANGER}
          onClick={() => onCancel()}
        >
          Cancel
        </Button>
        <Button
          onClick={() => onSave({
            ...data,
            name,
            description,
          })}
        >
          Save
        </Button>
      </ModalControls>
    </Modal>
  );
};

EditPointModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};
EditPointModal.defaultProps = {
  data: {},
};

export default EditPointModal;
