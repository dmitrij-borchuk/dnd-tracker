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
    getScene,
    resetScene,
    scene,
    redirect,
    match: {
      params: {
        scenarioId,
        id,
      },
    },
  } = props;

  useEffect(() => {
    if (id) {
      getScene(id);
    }
    return () => resetScene();
  }, []);

  if (id && !scene) {
    // TODO: Use loader
    return null;
  }

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
                onClick={() => redirect(`${ROUTES.SCENARIOS}/${scenarioId}`)}
                kind={KIND.DANGER}
              >
                Cancel
              </Button>
              <Button
                onClick={() => saveScene({
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
  resetScene: PropTypes.func.isRequired,
  getScene: PropTypes.func.isRequired,
  scene: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
SceneEditPage.defaultProps = {
  scene: null,
};

const mapStateToProps = ({ scenes }) => ({
  scene: scenes.currentScene,
});

const mapDispatchToProps = {
  getScenes: scenesAction.getScenes,
  getScene: scenesAction.fetchScene,
  saveScene: scenesAction.saveScene,
  resetScene: scenesAction.resetScene,
  redirect: commonActions.redirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SceneEditPage);
