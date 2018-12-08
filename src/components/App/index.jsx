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
import ScenarioEditPage from '../scenario-edit-page';
import CampaignsListPage from '../../pages/campaign/list';
import CampaignEditPage from '../campaign-edit-page';
import CampaignPage from '../../pages/campaign';
import ScenarioPage from '../../pages/scenario';
import ScenePage from '../../pages/scene';
import SceneEditPage from '../../pages/scene/editScene';
import ResourceEditPage from '../../pages/resource/resourceEdit';
import ResourcesPage from '../../pages/resource';
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
              <Link to={ROUTES.RESOURCES}>
                <SidebarItem>
                  Resources
                </SidebarItem>
              </Link>
            </Sidebar>
            <div className={styles.content}>
              <Route
                path="/"
                exact
                component={redirectTo(ROUTES.CAMPAIGNS)}
              />

              {/* Scenarios */}
              {/* <Route
                path={ROUTES.SCENARIOS}
                component={ScenariosListPage}
                exact
              /> */}
              <Route
                path={`${ROUTES.SCENARIOS}/:id`}
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

              {/* Scenes */}
              <Route
                path={`${ROUTES.SCENES}/:id`}
                component={ScenePage}
                exact
              />
              <Route
                path={`${ROUTES.SCENES_EDIT}/:scenarioId`}
                component={SceneEditPage}
                exact
              />
              <Route
                path={`${ROUTES.SCENES_EDIT}/:scenarioId/:id`}
                component={SceneEditPage}
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

              {/* Resources */}
              <Route
                path={`${ROUTES.RESOURCES}`}
                component={ResourcesPage}
                exact
              />
              <Route
                path={`${ROUTES.RESOURCES_EDIT}`}
                component={ResourceEditPage}
                exact
              />
              <Route
                path={`${ROUTES.RESOURCES_EDIT}/:id`}
                component={ResourceEditPage}
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
