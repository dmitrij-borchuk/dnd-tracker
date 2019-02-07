import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from '../../components/accordion';
import { List, ListItem } from '../../components/list';

const PointsAccordion = (props) => {
  const {
    points,
    onClick,
  } = props;

  return (
    <Accordion title="Points">
      <List>
        {Object.keys(points).map(key => (
          <ListItem
            key={key}
            onClick={() => onClick(points[key])}
          >
            {points[key].name}
          </ListItem>
        ))}
      </List>
    </Accordion>
  );
};

PointsAccordion.propTypes = {
  onClick: PropTypes.func,
  points: PropTypes.objectOf(PropTypes.shape({
    linkedTo: PropTypes.string,
    resourceId: PropTypes.string,
  })),
};
PointsAccordion.defaultProps = {
  points: {},
  onClick: () => {},
};


export default PointsAccordion;
