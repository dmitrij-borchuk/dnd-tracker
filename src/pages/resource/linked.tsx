import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
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
import { IStore } from '../../interfaces';
import { useParams } from 'react-router-dom';
import { IPoint } from '../../interfaces/points';
import Loader from '../../components/loader';
import Alert, { TYPES } from '../../components/alert';

const coordsToPercents = (data: number) => `${data * 100}%`;

const selector = ({ resources,
  linkedResources,
  points,
}: IStore) => ({
    resources: resources.list,
    linkedResources: linkedResources.list,
    linkedResourcesError: linkedResources.error,
    points: points.list,
})

interface IProps {
  // redirect: PropTypes.func.isRequired,
  // savePoint: PropTypes.func.isRequired,
  // setModalState: PropTypes.func.isRequired,
  // showPointModal: PropTypes.bool.isRequired,
  // match: PropTypes.shape({
  //   params: PropTypes.shape({
  //     id: PropTypes.string,
  //   }),
  // }).isRequired,
  // resources: PropTypes.objectOf(PropTypes.shape({
  //   name: PropTypes.string,
  // })),
  // linkedResources: PropTypes.objectOf(PropTypes.shape({
  //   linkedTo: PropTypes.string,
  //   resourceId: PropTypes.string,
  // })),
  // points: PropTypes.objectOf(PropTypes.shape({
  //   linkedTo: PropTypes.string,
  //   resourceId: PropTypes.string,
  // })),
}
export const LinkedResourcePage: React.FC<IProps> = (props) => {
  const { resources, linkedResources, points, linkedResourcesError } = useSelector(selector)
  // const {
  //   redirect,
  //   savePoint,
  //   setModalState,
  //   showPointModal,
  // } = props;
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const [addMode, setAddMode] = useState(false);
  const [clickCoords, setClickCoords] = useState<{x: number, y:number}>();
  const [hoveredPoint, setHoveredPoint] = useState<IPoint>();
  const [showPointModal, setModalState] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<IPoint>();
  const imgRef = useRef<HTMLImageElement>(null);
  let pointCoords: {x: number, y: number};
  console.log('=-= id', id)
  console.log('=-= points', points)
  console.log('=-= linkedResources', linkedResources)

  useEffect(() => {
    dispatch(pointsActions.getPoints(id))
  }, []);
  useEffect(() => {
    dispatch(linkedResourcesActions.getLinkedResource(id))
  }, []);

  if (imgRef.current && clickCoords) {
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
  
  console.log('=-= linkedResourcesError', linkedResourcesError)
  if (linkedResourcesError) {
    return <Alert type={TYPES.DANGER}>
      {linkedResourcesError.message}
    </Alert>
  }

  if (!linkedResources[id]) {
    return <Loader fillParent />
  }

  const linked = linkedResources[id];
  const resource = resources[linked.resourceId];
  const onPointSave = (point: IPoint) => {
    dispatch(pointsActions.savePoint({
      ...pointCoords,
      ...point,
      linkedId: linked.id,
    }))
  }
  const onImgClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
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
                onClick={() => dispatch(commonActions.redirect(`${ROUTES.SCENES}/${linked.linkedTo}`))}
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
              // onTouchStart={onImgClick}
              onClick={onImgClick}
            />
            {Object.keys(points).map(key => (
              <div
                key={key}
                className={cn(styles.point, { [styles.hovered]: hoveredPoint && hoveredPoint.id === key })}
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
            setSelectedPoint(undefined);
            setModalState(false);
          }}
          data={selectedPoint}
        />
      )}
    </Page>
  );
};

// LinkedResourcePage.propTypes = {
//   redirect: PropTypes.func.isRequired,
//   savePoint: PropTypes.func.isRequired,
//   setModalState: PropTypes.func.isRequired,
//   showPointModal: PropTypes.bool.isRequired,
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string,
//     }),
//   }).isRequired,
//   resources: PropTypes.objectOf(PropTypes.shape({
//     name: PropTypes.string,
//   })),
//   linkedResources: PropTypes.objectOf(PropTypes.shape({
//     linkedTo: PropTypes.string,
//     resourceId: PropTypes.string,
//   })),
//   points: PropTypes.objectOf(PropTypes.shape({
//     linkedTo: PropTypes.string,
//     resourceId: PropTypes.string,
//   })),
// };
// LinkedResourcePage.defaultProps = {
//   resources: {},
//   linkedResources: {},
//   points: {},
// };

// const mapStateToProps = ({
//   resources,
//   linkedResources,
//   points,
//   linkedResourcesPage,
// }) => ({
//   resources: resources.list,
//   linkedResources,
//   points,
//   showPointModal: linkedResourcesPage.showPointModal,
// });

// const mapDispatchToProps = {
//   redirect: commonActions.redirect,
//   getLinkedResource: linkedResourcesActions.getLinkedResource,
//   getPoints: pointsActions.getPoints,
//   savePoint: pointsActions.savePoint,
//   setModalState: linkedResourcesPageActions.setModalState,
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(loaderHoc2((props) => {
//   const {
//     match: {
//       params: {
//         id,
//       },
//     },
//     points,
//     linkedResources,
//     getLinkedResource,
//     getPoints,
//   } = props;

//   useEffect(() => { getPoints(id); }, []);
//   useEffect(() => { getLinkedResource(id); }, []);
//   return () => linkedResources[id] && points;
// })(LinkedResourcePage));
