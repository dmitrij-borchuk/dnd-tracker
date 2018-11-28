import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as scenariosAction from '../../actions/scenarios';
import * as scenesAction from '../../actions/scenes';
import * as commonActions from '../../actions/common';
import {
  Card,
  CardHeader,
  CardBody,
} from '../../components/card';
import { Button } from '../../components/button';
import {
  List,
  ListItem,
} from '../../components/list';
import Page from '../../components/page';
import { ROUTES } from '../../constants';

import styles from './styles.css';

const ScenarioEditPage = (props) => {
  const {
    getScenario,
    getScenes,
    resetScenario,
    resetSceneList,
    scenario,
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
      getScenario(id);
    }
    return () => resetScenario();
  }, []);
  useEffect(() => {
    if (id) {
      getScenes(id);
    }
    return () => resetSceneList();
  }, []);

  if (!scenario) {
    // TODO: use loader
    return null;
  }

  return (
    <Page>
      <Card className={styles.card}>
        <CardHeader>
          {scenario.name}
        </CardHeader>
        <CardBody>
          {scenario.description}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            Scenes
            <div className={styles.controls}>
              <Button
                onClick={() => redirect(`${ROUTES.SCENES_EDIT}/${id}`)}
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

ScenarioEditPage.propTypes = {
  redirect: PropTypes.func.isRequired,
  getScenes: PropTypes.func.isRequired,
  resetSceneList: PropTypes.func.isRequired,
  resetScenario: PropTypes.func.isRequired,
  getScenario: PropTypes.func.isRequired,
  scenario: PropTypes.shape({
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
ScenarioEditPage.defaultProps = {
  scenario: null,
  scenes: [],
};

const mapStateToProps = ({ scenarios, scenes }) => ({
  scenario: scenarios.currentScenario,
  scenes: scenes.list,
});

const mapDispatchToProps = {
  getScenes: scenesAction.getScenes,
  resetSceneList: scenesAction.resetSceneList,
  getScenario: scenariosAction.fetchScenario,
  resetScenario: scenariosAction.resetScenario,
  redirect: commonActions.redirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScenarioEditPage);
