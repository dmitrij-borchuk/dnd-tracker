
import React, {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as campaignsAction from '../../actions/campaigns';
import PageList from '../pageList';

const renderItem = item => item.name;

const ScenarioEditPage = (props) => {
  const {
    getList,
    list,
  } = props;

  useEffect(() => {
    getList();
  }, []);

  return (
    <PageList
      title="Campaigns"
      onAddClick={() => console.log('=-= onAddClick')}
      list={list}
      renderItem={renderItem}
      onItemClick={() => console.log('=-= onItemClick')}
    />
  );
};

ScenarioEditPage.propTypes = {
  getList: PropTypes.func.isRequired,
  scenario: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
};
ScenarioEditPage.defaultProps = {
  scenario: null,
};

const mapStateToProps = ({ campaigns }) => ({
  list: campaigns.list,
});

const mapDispatchToProps = {
  getList: campaignsAction.getCampaigns,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScenarioEditPage);
