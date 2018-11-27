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
import CampaignEditPage from '../campaign-edit-page';
import CampaignPage from '../../pages/campaign';
import ScenarioPage from '../../pages/scenario';
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
              <Link to={ROUTES.CAMPAIGNS}>
                <SidebarItem>
                  Campaigns
                </SidebarItem>
              </Link>
              {/* <Link to={ROUTES.SCENARIOS}>
                <SidebarItem>
                  Scenarios
                </SidebarItem>
              </Link> */}
            </Sidebar>
            <div className={styles.content}>
              <Route
                path="/"
                exact
                component={redirectTo(ROUTES.SCENARIOS)}
              />

              {/* Scenarios */}
              <Route
                path={ROUTES.SCENARIOS}
                component={ScenariosListPage}
                exact
              />
              <Route
                path={`${ROUTES.SCENARIOS}/:campaignId/:id`}
                component={ScenarioPage}
                exact
              />
              <Route
                path={`${ROUTES.SCENARIOS_EDIT}/:campaignId`}
                component={ScenarioEditPage}
                exact
              />
              <Route
                path={`${ROUTES.SCENARIOS_EDIT}/:campaignId/:id`}
                component={ScenarioEditPage}
              />

              {/* Campaigns */}
              <Route
                path={ROUTES.CAMPAIGNS}
                component={CampaignsListPage}
                exact
              />
              <Route
                path={`${ROUTES.CAMPAIGNS}/:id`}
                component={CampaignPage}
                exact
              />
              <Route
                path={`${ROUTES.CAMPAIGNS_EDIT}`}
                component={CampaignEditPage}
                exact
              />
              <Route
                path={`${ROUTES.CAMPAIGNS_EDIT}/:id`}
                component={CampaignEditPage}
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
