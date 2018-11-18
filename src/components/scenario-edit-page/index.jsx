import React, { PureComponent } from 'react';
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

class ScenarioEditPage extends PureComponent {
  // componentDidMount() {
  //   const {
  //     getScenarios,
  //   } = this.props;

  //   getScenarios();
  // }

  render() {
    const {
      scenarios,
    } = this.props;

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
                <Button onClick={() => console.log('=-= click')}>Save</Button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <InputWithLabel
              label="Name"
              id="name"
              fullWidth
            />
            <TextAriaWithLabel
              label="Description"
              id="description"
              fullWidth
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

ScenarioEditPage.propTypes = {
  scenarios: PropTypes.arrayOf(PropTypes.shape({})),
};
ScenarioEditPage.defaultProps = {
  scenarios: [],
};

const mapStateToProps = ({ scenarios }) => ({
  scenarios: scenarios.list,
});

const mapDispatchToProps = dispatch => ({
  getScenarios: () => dispatch(scenariosAction.getScenarios()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScenarioEditPage);
