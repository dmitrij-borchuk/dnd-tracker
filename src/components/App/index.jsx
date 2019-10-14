import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Router,
  Route,
  Link,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../utils/history';
import { ROUTES } from '../../constants';
import * as scenariosActions from '../../actions/scenarios';
import * as commonActions from '../../actions/common';
import * as authActions from '../../actions/auth';
import ScenarioEditPage from '../../pages/scenario/edit';
import CampaignsListPage from '../../pages/campaign/list';
import CampaignEditPage from '../../pages/campaign/edit';
import { CampaignPage } from '../../pages/campaign';
import ScenarioPage from '../../pages/scenario';
import ScenePage from '../../pages/scene';
import SceneEditPage from '../../pages/scene/editScene';
import { ResourceEditPage } from '../../pages/resource/resourceEdit';
import ResourceLinkingPage from '../../pages/resource/linking';
import ResourceLinkedPage from '../../pages/resource/linked';
import ResourcesPage from '../../pages/resource/list';
import Header from '../header';
import {
  Sidebar,
  SidebarItem,
} from '../sidebar';
import styles from './styles.css';

const redirectTo = (url) => () => (
  <Redirect
    to={{
      pathname: url,
    }}
  />
);

const App = (props) => {
  const {
    signIn,
    signOut,
    currentUser,
    setupApp,
  } = props;
  const [menuClosed, setMenuClosed] = useState(true);
  const header = (
    <Header
      onSignIn={signIn}
      onSignOut={signOut}
      onMenuClick={() => setMenuClosed(!menuClosed)}
      user={currentUser}
      title="DnD Tracker"
    />
  );

  useEffect(() => { setupApp(); }, []);

  if (!currentUser) {
    return (
      <>
        {header}
        <div className={styles.appBody}>
          You need to sign in to use this website
        </div>
      </>
    );
  }

  return (
    <>
      {header}
      <Router history={history}>
        <div className={styles.appBody}>
          <Sidebar closed={menuClosed}>
            <Link
              onClick={() => setMenuClosed(true)}
              to={ROUTES.CAMPAIGNS}
            >
              <SidebarItem>
                Campaigns
              </SidebarItem>
            </Link>
            <Link
              onClick={() => setMenuClosed(true)}
              to={ROUTES.RESOURCES}
            >
              <SidebarItem>
                Resources
              </SidebarItem>
            </Link>
          </Sidebar>
          <div className={styles.content}>
            <Switch>
              <Route
                path="/"
                exact
                component={redirectTo(ROUTES.CAMPAIGNS)}
              />

              {/* Scenarios */}
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
                path={`${ROUTES.CAMPAIGNS_EDIT}`}
                component={CampaignEditPage}
                exact
              />
              <Route
                path={`${ROUTES.CAMPAIGNS}/:id`}
                component={CampaignPage}
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
              <Route
                path={`${ROUTES.RESOURCE_LINKING}/:id`}
                component={ResourceLinkingPage}
              />
              <Route
                path={`${ROUTES.RESOURCE_LINKED}/:id`}
                component={ResourceLinkedPage}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
};

App.propTypes = {
  setupApp: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};
App.defaultProps = {
  currentUser: null,
};

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getScenarios: () => dispatch(scenariosActions.getScenarios()),
  setupApp: () => dispatch(commonActions.setupApp()),
  signIn: () => dispatch(authActions.signIn()),
  signOut: () => dispatch(authActions.signOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
