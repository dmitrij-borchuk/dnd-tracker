import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as commonActions from '../../actions/common';
import * as linkedResourcesActions from '../../actions/linkedResources';
import * as pointsActions from '../../actions/points';
import * as linkedResourcesPageActions from '../../actions/linkedResourcesPage';
import { ROUTES } from '../../constants';
import { loaderHoc2 } from '../../utils/hocs/loader';
import { Card, CardHeader, CardBody } from '../../components/card';
import Page from '../../components/page';
import { Button, KIND } from '../../components/button';
import PointsAccordion from './pointsAccordion';
import PointModal from './pointModal';
import styles from './styles.css';

const coordsToPercents = data => `${data * 100}%`;

const LinkedResourcePage = (props) => {
  const {
    match: {
      params: {
        id,
      },
    },
    redirect,
    resources,
    linkedResources,
    savePoint,
    setModalState,
    points,
    showPointModal,
  } = props;
  const linked = linkedResources[id];
  const resource = resources[linked.resourceId];
  const [addMode, setAddMode] = useState(false);
  const [clickCoords, setClickCoords] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const imgRef = useRef(null);
  let pointCoords;

  if (imgRef && clickCoords) {
    const {
      top,
      left,
      height,
      width,
    } = imgRef.current.getBoundingClientRect();
    pointCoords = {
      x: (clickCoords.x - left) / width,
      y: (clickCoords.y - top) / height,
    };
  }
  const onPointSave = point => savePoint({
    ...pointCoords,
    ...point,
    linkedId: linked.id,
  });
  const onImgClick = (e) => {
    if (addMode) {
      setClickCoords({
        x: e.clientX,
        y: e.clientY,
      });
      setAddMode(false);
      setModalState(true);
    }
  };

  return (
    <Page>
      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            {resource.name}
            <div className={styles.controls}>
              <Button
                onClick={() => redirect(`${ROUTES.SCENES}/${linked.linkedTo}`)}
                kind={KIND.DANGER}
              >
                Back
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="bodyControls">
            <Button
              onClick={() => setAddMode(true)}
              kind={KIND.PRIMARY}
            >
              Add point
            </Button>
          </div>
          <PointsAccordion
            points={points}
            onClick={point => setHoveredPoint(point)}
          />
          <div className={styles.imgContainer}>
            <img
              src={resource.url}
              alt="Resource"
              className={cn(styles.bigImg, { [styles.cursorCrosshair]: addMode })}
              ref={imgRef}
              onTouchStart={onImgClick}
              onClick={onImgClick}
            />
            {Object.keys(points).map(key => (
              <div
                key={key}
                className={cn(styles.point, { [styles.hovered]: hoveredPoint?.id === key })}
                style={{
                  left: coordsToPercents(points[key].x),
                  top: coordsToPercents(points[key].y),
                }}
                onClick={() => {
                  setSelectedPoint(points[key]);
                  setModalState(true);
                }}
              />
            ))}
          </div>
        </CardBody>
      </Card>

      {showPointModal && (
        <PointModal
          onSave={onPointSave}
          onClose={() => {
            setSelectedPoint(null);
            setModalState(false);
          }}
          data={selectedPoint}
        />
      )}
    </Page>
  );
};

LinkedResourcePage.propTypes = {
  redirect: PropTypes.func.isRequired,
  savePoint: PropTypes.func.isRequired,
  setModalState: PropTypes.func.isRequired,
  showPointModal: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  resources: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  linkedResources: PropTypes.objectOf(PropTypes.shape({
    linkedTo: PropTypes.string,
    resourceId: PropTypes.string,
  })),
  points: PropTypes.objectOf(PropTypes.shape({
    linkedTo: PropTypes.string,
    resourceId: PropTypes.string,
  })),
};
LinkedResourcePage.defaultProps = {
  resources: {},
  linkedResources: {},
  points: {},
};

const mapStateToProps = ({
  resources,
  linkedResources,
  points,
  linkedResourcesPage,
}) => ({
  resources: resources.list,
  linkedResources,
  points,
  showPointModal: linkedResourcesPage.showPointModal,
});

const mapDispatchToProps = {
  redirect: commonActions.redirect,
  getLinkedResource: linkedResourcesActions.getLinkedResource,
  getPoints: pointsActions.getPoints,
  savePoint: pointsActions.savePoint,
  setModalState: linkedResourcesPageActions.setModalState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(loaderHoc2((props) => {
  const {
    match: {
      params: {
        id,
      },
    },
    points,
    linkedResources,
    getLinkedResource,
    getPoints,
  } = props;

  useEffect(() => { getPoints(id); }, []);
  useEffect(() => { getLinkedResource(id); }, []);
  return () => linkedResources[id] && points;
})(LinkedResourcePage));
