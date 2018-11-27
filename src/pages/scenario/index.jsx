import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as scenariosAction from '../../actions/scenarios';
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
import Page from '../../components/page';
import styles from './styles.css';

const ScenarioEditPage = (props) => {
  const {
    saveScenario,
    getScenario,
    resetScenario,
    scenario,
    match: {
      params: {
        campaignId,
        id,
      },
    },
  } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (id) {
      getScenario(id);
    }
    return () => resetScenario();
  }, []);
  console.log('=-= scenario', scenario)

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
            {id ? 'Edit' : 'Create'}
            &nbsp;scenario
            <div className={styles.controls}>
              <Button
                onClick={() => console.log('=-= click')}
                kind={KIND.DANGER}
              >
                Cancel
              </Button>
              <Button
                onClick={() => saveScenario({
                  campaignId,
                  name,
                  description,
                })}
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
    </Page>
  );
};

ScenarioEditPage.propTypes = {
  saveScenario: PropTypes.func.isRequired,
  resetScenario: PropTypes.func.isRequired,
  getScenario: PropTypes.func.isRequired,
  scenario: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
ScenarioEditPage.defaultProps = {
  scenario: null,
};

const mapStateToProps = ({ scenarios }) => ({
  scenario: scenarios.currentScenario,
});

const mapDispatchToProps = {
  getScenarios: scenariosAction.getScenarios,
  getScenario: scenariosAction.fetchScenario,
  saveScenario: scenariosAction.saveScenario,
  resetScenario: scenariosAction.resetScenario,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScenarioEditPage);
