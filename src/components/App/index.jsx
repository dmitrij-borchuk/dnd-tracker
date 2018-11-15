import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getScenarios } from '../../actions';
import ScenarioPage from '../scenario-page';
// import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import Timer from '../Timer/container';
// import Settings from '../Settings/container';
// import SettingsIcon from '../Icons/settings';
// import TimerControls from '../TimerControls/container';
// import appleTouchIcon from '../../assets/favicon/apple-touch-icon.png';
// import favicon32x32 from '../../assets/favicon/favicon-32x32.png';
// import favicon16x16 from '../../assets/favicon/favicon-16x16.png';
// import webmanifest from '../../assets/favicon/site.webmanifest';
// import safariPinnedTab from '../../assets/favicon/safari-pinned-tab.svg';
// import {
//   AppWrapper,
//   Circle,
//   Controls,
//   SettingsIconWrapper,
// } from './styles';

// {/* <Helmet> */ }
// {/* Favicon */ }
// {/* <link rel="apple-touch-icon" sizes="144x144" href={appleTouchIcon} />
//         <link rel="icon" type="image/png" sizes="32x32" href={favicon32x32} />
//         <link rel="icon" type="image/png" sizes="16x16" href={favicon16x16} />
//         <link rel="manifest" href={webmanifest} />
//         <link rel="mask-icon" href={safariPinnedTab} color="#5bbad5" />
//         <meta name="msapplication-TileColor" content="#da532c" />
//         <meta name="theme-color" content="#ffffff" />
//       </Helmet> */}
class App extends PureComponent {
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
      <>
        <ScenarioPage
          scenarios={scenarios}
        />
      </>
    );
  }
}

const mapStateToProps = ({ scenarios }) => ({
  scenarios: scenarios.list,
});

const mapDispatchToProps = dispatch => ({
  getScenarios: () => dispatch(getScenarios()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);


// App.propTypes = {
//   showSettings: PropTypes.func.isRequired,
//   setCurrentSession: PropTypes.func.isRequired,
//   settingsPopupShown: PropTypes.bool.isRequired,
//   currentSession: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//   }),
//   sessions: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//   })).isRequired,
// };

// App.defaultProps = {
//   currentSession: { id: '' },
// };