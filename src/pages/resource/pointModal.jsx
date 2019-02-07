import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditPointModal from '../../components/editPoint';
import PointModalView from '../../components/pointModal';

const PointModal = (props) => {
  const {
    onSave,
    onClose,
    data,
  } = props;
  const [editMode, setEditMode] = useState(!data);

  return (
    <>
      {editMode ? (
        <EditPointModal
          onSave={onSave}
          onCancel={() => {
            if (data) {
              setEditMode(false);
            } else {
              onClose();
            }
          }}
          data={data || {}}
        />
      ) : (
        <PointModalView
          onEdit={() => setEditMode(true)}
          onClose={onClose}
          data={data}
        />
      )}
    </>
  );
};

PointModal.propTypes = {
  onSave: PropTypes.func.isRequired,
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
