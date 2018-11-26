import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as campaignsAction from '../../actions/campaigns';
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
    match: {
      params: {
        id,
      },
    },
  } = props;
  console.log('=-= campaign', campaign)

  useEffect(() => {
    resetCampaign();
    if (id) {
      getCampaign(id);
    }
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
  // onSaveClick = {() => saveCampaign({
  //   name,
  //   description,
  // })}
  return (
    <EditPage
      title="Create campaign"
      onCancelClick={() => console.log('=-= click')}
      onSaveClick={d => console.log('=-= save', d)}
      inputs={inputs}
    />
  );
};

CampaignEditPage.propTypes = {
  saveCampaign: PropTypes.func.isRequired,
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignEditPage);
