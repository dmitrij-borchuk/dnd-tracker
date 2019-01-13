import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as scenariosAction from '../../actions/scenarios';
import * as commonActions from '../../actions/common';
import { Card, CardHeader, CardBody } from '../../components/card';
import { Button, KIND } from '../../components/button';
import Label from '../../components/label';
import RichText from '../../components/richText';
import { InputWithLabel } from '../../components/forms';
import { ROUTES } from '../../constants';
import Alert, { TYPES } from '../../components/alert';
import loaderHoc from '../../utils/hocs/loader';
import styles from './styles.css';

const ScenarioEditPage = (props) => {
  const {
    saveScenario,
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
  const [name, setName] = useState(scenario?.name || '');
  const [description, setDescription] = useState(scenario?.description || '');
  const isEmpty = name === '';
  const cancelUrl = id
    ? `${ROUTES.SCENARIOS}/${id}`
    : `${ROUTES.CAMPAIGNS}/${campaignId}`;

  return (
    <div className="page-content">
      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            {id ? 'Edit' : 'Create'}
            &nbsp;scenario
            <div className={styles.controls}>
              <Button
                onClick={() => redirect(cancelUrl)}
                kind={KIND.DANGER}
              >
                Cancel
              </Button>
              <Button
                onClick={() => saveScenario({
                  ...scenario,
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
          <Label>Description</Label>
          <RichText
            value={description}
            onChange={setDescription}
          />
        </CardBody>
      </Card>
    </div>
  );
};

ScenarioEditPage.propTypes = {
  redirect: PropTypes.func.isRequired,
  saveScenario: PropTypes.func.isRequired,
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
)(loaderHoc({
  init: (props) => {
    const {
      getScenario,
      resetScenario,
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
  },
  check: props => !props.match.params.id || !!props.scenario,
})(ScenarioEditPage));
