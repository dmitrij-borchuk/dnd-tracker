import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import SanitizeHtml from '../sanitizeHtml';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalControls,
} from '../modal';

const PointModal = (props) => {
  const {
    onEdit,
    onClose,
    data,
  } = props;

  return (
    <Modal>
      <ModalHeader>{data.name}</ModalHeader>
      <ModalBody>
        <SanitizeHtml>{data.description || ''}</SanitizeHtml>
      </ModalBody>
      <ModalControls>
        <Button
          onClick={() => onEdit()}
        >
          Edit
        </Button>
        <Button
          onClick={() => onClose()}
        >
          Close
        </Button>
      </ModalControls>
    </Modal>
  );
};

PointModal.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};
PointModal.defaultProps = {
  data: {},
};

export default PointModal;
