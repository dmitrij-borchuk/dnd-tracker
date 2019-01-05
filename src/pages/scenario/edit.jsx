import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as scenariosAction from '../../actions/scenarios';
import * as commonActions from '../../actions/common';
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
import { ROUTES } from '../../constants';
import Alert, { TYPES } from '../../components/alert';
import styles from './styles.css';

const ScenarioEditPage = (props) => {
  const {
    saveScenario,
    getScenario,
    resetScenario,
    scenario,
    error,
    redirect,
    match: {
      params: {
        campaignId,
        id,
      },
    },
  } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const isEmpty = name === '';

  useEffect(() => {
    if (id) {
      getScenario(id);
    }
    return () => resetScenario();
  }, []);

  return (
    <div className="page-content">
      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            {id ? 'Edit' : 'Create'}
            &nbsp;scenario
            <div className={styles.controls}>
              <Button
                onClick={() => redirect(`${ROUTES.CAMPAIGNS}/${campaignId}`)}
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
                disabled={isEmpty}
              >
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {error && (
            <Alert type={TYPES.DANGER}>
              {error.message}
            </Alert>
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

ScenarioEditPage.propTypes = {
  redirect: PropTypes.func.isRequired,
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
  error: PropTypes.instanceOf(Error),
};
ScenarioEditPage.defaultProps = {
  scenario: null,
  error: null,
};

const mapStateToProps = ({ scenarios }) => ({
  scenario: scenarios.currentScenario,
  error: scenarios.error,
});

const mapDispatchToProps = {
  getScenarios: scenariosAction.getScenarios,
  getScenario: scenariosAction.fetchScenario,
  saveScenario: scenariosAction.saveScenario,
  resetScenario: scenariosAction.resetScenario,
  redirect: commonActions.redirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScenarioEditPage);
