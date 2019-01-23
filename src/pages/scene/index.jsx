import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as scenesAction from '../../actions/scenes';
import * as commonActions from '../../actions/common';
import * as resourcesActions from '../../actions/resources';
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
import Loader from '../../components/loader';
import { ROUTES } from '../../constants';

import styles from './styles.css';

const SceneEditPage = (props) => {
  const {
    getScene,
    getResources,
    resetScene,
    resetResourcesList,
    scene,
    redirect,
    resources,
    match: {
      params: {
        id,
      },
    },
    loading,
  } = props;

  useEffect(() => {
    if (id) {
      getScene(id);
    }
    return () => resetScene();
  }, []);
  useEffect(() => {
    if (id) {
      getResources(id);
    }
    return () => resetResourcesList();
  }, []);

  return (
    <Page>
      <Card className={styles.card}>
        <CardHeader className={styles.listHeader}>
          {scene?.name}
          <div className={styles.controls}>
            <Button
              onClick={() => redirect(`${ROUTES.SCENES_EDIT}/${scene?.scenarioId}/${scene?.id}`)}
            >
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          {loading && (
            <Loader fillParent />
          )}
          <SanitizeHtml>{scene?.description}</SanitizeHtml>
        </CardBody>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            Resources
            <div className={styles.controls}>
              <Button
                onClick={() => redirect(`${ROUTES.RESOURCE_LINKING}/${id}`)}
              >
                Add
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <List>
            {resources.map(item => (
              <ListItem
                className={styles.listItem}
                key={item.id}
                onClick={() => console.warn('Not implemented: open linked resource')}
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
  getResources: PropTypes.func.isRequired,
  resetResourcesList: PropTypes.func.isRequired,
  resetScene: PropTypes.func.isRequired,
  getScene: PropTypes.func.isRequired,
  scene: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  resources: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};
SceneEditPage.defaultProps = {
  scene: null,
  resources: [],
};

const mapStateToProps = ({ scenes, resources }) => ({
  scene: scenes.currentScene,
  scenes: scenes.list,
  loading: scenes.loading,
  resources: resources.linkedResources,
});

const mapDispatchToProps = {
  getResources: resourcesActions.getLinkedResources,
  resetResourcesList: resourcesActions.resetLinkedResourcesList,
  getScene: scenesAction.fetchScene,
  resetScene: scenesAction.resetScene,
  redirect: commonActions.redirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SceneEditPage);
