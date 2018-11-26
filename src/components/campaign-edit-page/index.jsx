import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as campaignsAction from '../../actions/campaigns';
import * as commonActions from '../../actions/common';
import { ROUTES } from '../../constants';
import EditPage, {
  TYPES,
} from '../edit-page';
// import styles from './styles.css';

const CampaignEditPage = (props) => {
  const {
    saveCampaign,
    getCampaign,
    resetCampaign,
    campaign,
    redirect,
    match: {
      params: {
        id,
      },
    },
  } = props;

  useEffect(() => {
    if (id) {
      getCampaign(id);
    }
    return () => resetCampaign();
  }, []);

  const inputs = [{
    type: TYPES.INPUT,
    label: 'Name',
    key: 'name',
    value: campaign?.name || '',
  },
  {
    type: TYPES.TEXTAREA,
    label: 'Description',
    key: 'description',
    value: campaign?.description || '',
  }];

  if (id && !campaign) {
    // TODO: Use loader
    return null;
  }

  return (
    <EditPage
      title="Create campaign"
      onCancelClick={() => redirect(ROUTES.CAMPAIGNS)}
      onSaveClick={data => saveCampaign({
        id,
        ...data,
      })}
      inputs={inputs}
    />
  );
};

CampaignEditPage.propTypes = {
  saveCampaign: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  resetCampaign: PropTypes.func.isRequired,
  getCampaign: PropTypes.func.isRequired,
  campaign: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
CampaignEditPage.defaultProps = {
  campaign: null,
};

const mapStateToProps = ({ campaigns }) => ({
  campaign: campaigns.currentCampaign,
});

const mapDispatchToProps = {
  getCampaigns: campaignsAction.getCampaigns,
  getCampaign: campaignsAction.fetchCampaign,
  saveCampaign: campaignsAction.saveCampaign,
  resetCampaign: campaignsAction.resetCampaign,
  redirect: commonActions.redirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignEditPage);
