
import React, {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as campaignsAction from '../../actions/campaigns';
import * as commonActions from '../../actions/common';
import PageList from '../pageList';
import { ROUTES } from '../../constants';

const renderItem = item => item.name;

const ScenarioEditPage = (props) => {
  const {
    getList,
    list,
    redirect,
  } = props;

  useEffect(() => {
    getList();
  }, []);

  return (
    <PageList
      title="Campaigns"
      onAddClick={() => redirect(ROUTES.CAMPAIGNS_EDIT)}
      list={list}
      renderItem={renderItem}
      onItemClick={item => redirect(`${ROUTES.CAMPAIGNS}/${item.id}`)}
    />
  );
};

ScenarioEditPage.propTypes = {
  getList: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
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
  redirect: commonActions.redirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScenarioEditPage);
