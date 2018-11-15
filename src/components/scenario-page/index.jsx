import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getScenarios } from '../../actions';

const ScenarioPage = (props) => {
  const {
    scenarios,
  } = props;

  return (
    <div>
      {scenarios.map(scenario => (
        <div key={scenario.name}>{scenario.name}</div>
      ))}
    </div>
  );
};
// class App extends PureComponent {
//   componentDidMount() {
//     const {
//       getScenarios,
//     } = this.props;

//     getScenarios();
//   }

//   render() {
//     const {
//       scenarios,
//     } = this.props;

//     return (
//       <>
//         {scenarios.map(scenario => (
//           <div key={scenario.name}>{scenario.name}</div>
//         ))}
//       </>
//     );
//   }
// }

const mapStateToProps = ({ scenarios }) => ({
  scenarios: scenarios.list,
});

const mapDispatchToProps = dispatch => ({
  getScenarios: () => dispatch(getScenarios()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScenarioPage);
