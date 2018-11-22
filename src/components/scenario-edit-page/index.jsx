import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as scenariosAction from '../../actions/scenarios';
import {
  Card,
  CardHeader,
  CardBody,
} from '../card';
import {
  Button,
  KIND,
} from '../button';
import {
  InputWithLabel,
  TextAriaWithLabel,
} from '../forms';
import styles from './styles.css';

const ScenarioEditPage = (props) => {
  const {
    saveScenario,
  } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="page-content">
      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            Create scenario
            <div className={styles.controls}>
              <Button
                onClick={() => console.log('=-= click')}
                kind={KIND.DANGER}
              >
                Cancel
              </Button>
              <Button
                onClick={() => saveScenario({
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
    </div>
  );
};

ScenarioEditPage.propTypes = {
  saveScenario: PropTypes.func,
};
ScenarioEditPage.defaultProps = {
  saveScenario: () => {},
};

const mapStateToProps = ({ scenarios }) => ({
  scenarios: scenarios.list,
});

const mapDispatchToProps = {
  getScenarios: scenariosAction.getScenarios,
  saveScenario: scenariosAction.saveScenario,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScenarioEditPage);
