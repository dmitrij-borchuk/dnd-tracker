import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RichText from '../../components/richText';
import * as campaignsAction from '../../actions/campaigns';
import * as commonActions from '../../actions/common';
import { ROUTES } from '../../constants';
import Page from '../../components/page';
import { Card, CardHeader, CardBody } from '../../components/card';
import { Button, KIND } from '../../components/button';
import { InputWithLabel } from '../../components/forms';
import loaderHoc from '../../utils/hocs/loader';
import styles from './styles.css';

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

  const [name, setName] = useState(campaign?.name || '');
  const [description, setDescription] = useState(campaign?.description || '');

  if (id && !campaign) {
    // TODO: Use loader
    return null;
  }

  return (
    <Page>
      <Card>
        <CardHeader flex>
          Create campaign
          <div className={styles.controls}>
            <Button
              onClick={() => redirect(ROUTES.CAMPAIGNS)}
              kind={KIND.DANGER}
            >
              Cancel
            </Button>
            <Button
              onClick={() => saveCampaign({
                ...campaign,
                name,
                description,
              })}
            >
              Save
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <InputWithLabel
            label="Name"
            id="name"
            key="name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
          />
          <RichText
            value={description}
            onChange={setDescription}
          />
        </CardBody>
      </Card>
    </Page>
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
)(loaderHoc({
  init: (props) => {
    const {
      getCampaign,
      resetCampaign,
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
  },
  check: props => !props.match.params.id || !!props.campaign,
})(CampaignEditPage));
