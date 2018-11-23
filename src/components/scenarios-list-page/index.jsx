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
  List,
  ListItem,
} from '../list';
import { SmallButton } from '../button';
import styles from './styles.css';

class ScenariosListPage extends PureComponent {
  componentDidMount() {
    const {
      getScenarios,
    } = this.props;

    getScenarios();
  }

  render() {
    const {
      scenarios,
    } = this.props;

    return (
      <div className="page-content">
        <Card>
          <CardHeader>
            <div className={styles.listHeader}>
              Scenarios
              <SmallButton onClick={() => console.log('=-= click')}>Add</SmallButton>
            </div>
          </CardHeader>
          <CardBody>
            <List>
              {scenarios.map(scenario => (
                <ListItem key={scenario.name}>{scenario.name}</ListItem>
              ))}
            </List>
          </CardBody>
        </Card>
      </div>
    );
  }
}

ScenariosListPage.propTypes = {
  getScenarios: PropTypes.func.isRequired,
  scenarios: PropTypes.arrayOf(PropTypes.shape({})),
};
ScenariosListPage.defaultProps = {
  scenarios: [],
};

const mapStateToProps = ({ scenarios }) => ({
  scenarios: scenarios.list,
});

const mapDispatchToProps = {
  getScenarios: scenariosAction.getScenarios,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScenariosListPage);
