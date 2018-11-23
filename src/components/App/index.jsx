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
              <SidebarItem>
                <Link to="/scenarios/">Scenarios</Link>
              </SidebarItem>
            </Sidebar>
            <div className={styles.content}>
              <Route path="/" exact component={redirectTo('/scenarios')} />
              <Route path={ROUTES.SCENARIOS} exact component={ScenariosListPage} />
              <Route path="/scenarios/edit" component={ScenarioEditPage} />
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
