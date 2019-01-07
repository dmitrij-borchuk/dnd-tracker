import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as scenesAction from '../../actions/scenes';
import * as commonActions from '../../actions/common';
import { ROUTES } from '../../constants';
import {
  Card,
  CardHeader,
  CardBody,
} from '../../components/card';
import Loader from '../../components/loader';
import {
  Button,
  KIND,
} from '../../components/button';
import {
  InputWithLabel,
  TextAriaWithLabel,
} from '../../components/forms';
import styles from './styles.css';

const SceneEditPage = (props) => {
  const {
    saveScene,
    scene,
    redirect,
    loading,
    match: {
      params: {
        scenarioId,
        id,
      },
    },
  } = props;
  const cancelUrl = id
    ? `${ROUTES.SCENES}/${id}`
    : `${ROUTES.SCENARIOS}/${scenarioId}`;

  const [name, setName] = useState(scene?.name || '');
  const [description, setDescription] = useState(scene?.description || '');
  const isEmpty = name === '';

  return (
    <div className="page-content">
      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            {id ? 'Edit' : 'Create'}
            &nbsp;scene
            <div className={styles.controls}>
              <Button
                onClick={() => redirect(cancelUrl)}
                kind={KIND.DANGER}
              >
                Cancel
              </Button>
              <Button
                onClick={() => saveScene({
                  ...scene,
                  scenarioId,
                  name,
                  description,
                })}
                disabled={isEmpty}
              >
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {loading && (
            <Loader fillParent />
          )}
          <InputWithLabel
            label="Name"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
          />
          <TextAriaWithLabel
            label="Description"
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
          />
        </CardBody>
      </Card>
    </div>
  );
};

SceneEditPage.propTypes = {
  redirect: PropTypes.func.isRequired,
  saveScene: PropTypes.func.isRequired,
  scene: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  loading: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
SceneEditPage.defaultProps = {
  scene: null,
  loading: false,
};

const mapStateToProps = ({ scenes }) => ({
  scene: scenes.currentScene,
  loading: scenes.loading,
});

const mapDispatchToProps = {
  getScene: scenesAction.fetchScene,
  saveScene: scenesAction.saveScene,
  resetScene: scenesAction.resetScene,
  redirect: commonActions.redirect,
};

const loaderHoc = Component => (props) => {
  const {
    getScene,
    resetScene,
    scene,
    match: {
      params: {
        id,
      },
    },
  } = props;
  // const [loading, setLoading] = useState(true);
  const loaded = !!scene;

  useEffect(() => {
    if (id) {
      getScene(id);
    }
    return () => resetScene();
  }, []);

  if (id && !loaded) {
    return (<Loader fillParent />);
  }
  return <Component {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(loaderHoc(SceneEditPage));
