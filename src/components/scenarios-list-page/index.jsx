import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as scenariosAction from '../../actions/scenarios';
import * as commonActions from '../../actions/common';
import { ROUTES } from '../../constants';
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
      redirect,
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
                <ListItem
                  className={styles.listItem}
                  key={scenario.id}
                  onClick={() => redirect(`${ROUTES.SCENARIOS_EDIT}/${scenario.id}`)}
                >
                  {scenario.name}
                </ListItem>
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
  redirect: PropTypes.func.isRequired,
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
  redirect: commonActions.redirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScenariosListPage);
