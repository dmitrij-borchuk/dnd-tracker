import React, { PureComponent } from 'react';
import {
  Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../utils/history';
import { ROUTES } from '../../constants';
import * as scenariosAction from '../../actions/scenarios';
import ScenariosListPage from '../scenarios-list-page';
import ScenarioEditPage from '../scenario-edit-page';
import CampaignsListPage from '../campaigns-list-page';
import Header from '../header';
import {
  Sidebar,
  SidebarItem,
} from '../sidebar';
import styles from './styles.css';

const redirectTo = url => () => (
  <Redirect
    to={{
      pathname: url,
    }}
  />
);

class App extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <Router history={history}>
          <div className={styles.appBody}>
            <Sidebar>
              <Link to={ROUTES.SCENARIOS}>
                <SidebarItem>
                  Scenarios
                </SidebarItem>
              </Link>
              <Link to={ROUTES.CAMPAIGNS}>
                <SidebarItem>
                  Campaigns
                </SidebarItem>
              </Link>
            </Sidebar>
            <div className={styles.content}>
              <Route
                path="/"
                exact
                component={redirectTo(ROUTES.SCENARIOS)}
              />
              <Route
                path={ROUTES.SCENARIOS}
                exact
                component={ScenariosListPage}
              />
              <Route
                path={`${ROUTES.SCENARIOS_EDIT}/:id`}
                component={ScenarioEditPage}
              />
              <Route
                path={ROUTES.CAMPAIGNS}
                exact
                component={CampaignsListPage}
              />
            </div>
          </div>
        </Router>
      </>
    );
  }
}

App.propTypes = {
};
App.defaultProps = {
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
)(App);
