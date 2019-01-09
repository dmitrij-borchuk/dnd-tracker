import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as scenesAction from '../../actions/scenes';
import * as commonActions from '../../actions/common';
import {
  Card,
  CardHeader,
  CardBody,
} from '../../components/card';
import { Button } from '../../components/button';
import SanitizeHtml from '../../components/sanitizeHtml';
import {
  List,
  ListItem,
} from '../../components/list';
import Page from '../../components/page';
import { ROUTES } from '../../constants';

import styles from './styles.css';

const SceneEditPage = (props) => {
  const {
    getScene,
    getScenes,
    resetScene,
    resetSceneList,
    scene,
    redirect,
    scenes,
    match: {
      params: {
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
  useEffect(() => {
    if (id) {
      getScenes(id);
    }
    return () => resetSceneList();
  }, []);

  if (!scene) {
    // TODO: use loader
    return null;
  }

  return (
    <Page>
      <Card className={styles.card}>
        <CardHeader className={styles.listHeader}>
          {scene.name}
          <div className={styles.controls}>
            <Button
              onClick={() => redirect(`${ROUTES.SCENES_EDIT}/${scene.scenarioId}/${scene.id}`)}
            >
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <SanitizeHtml>{scene.description}</SanitizeHtml>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            Resources
            <div className={styles.controls}>
              <Button
                onClick={() => redirect(ROUTES.RESOURCE_EDIT)}
              >
                Add
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <List>
            {scenes.map(item => (
              <ListItem
                className={styles.listItem}
                key={item.id}
                onClick={() => redirect(`${ROUTES.SCENES}/${item.id}`)}
              >
                {item.name}
              </ListItem>
            ))}
          </List>
        </CardBody>
      </Card>
    </Page>
  );
};

SceneEditPage.propTypes = {
  redirect: PropTypes.func.isRequired,
  getScenes: PropTypes.func.isRequired,
  resetSceneList: PropTypes.func.isRequired,
  resetScene: PropTypes.func.isRequired,
  getScene: PropTypes.func.isRequired,
  scene: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  scenes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  })),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
SceneEditPage.defaultProps = {
  scene: null,
  scenes: [],
};

const mapStateToProps = ({ scenes }) => ({
  scene: scenes.currentScene,
  scenes: scenes.list,
});

const mapDispatchToProps = {
  getScenes: scenesAction.getScenes,
  resetSceneList: scenesAction.resetSceneList,
  getScene: scenesAction.fetchScene,
  resetScene: scenesAction.resetScene,
  redirect: commonActions.redirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SceneEditPage);
