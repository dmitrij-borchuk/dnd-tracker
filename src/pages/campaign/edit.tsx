import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RichText from '../../components/richText';
import * as campaignsAction from '../../actions/campaigns';
import * as commonActions from '../../actions/common';
import { ROUTES } from '../../constants';
import Page from '../../components/page';
import { Card, CardHeader, CardBody } from '../../components/card';
import { Button, KIND } from '../../components/button';
import { InputWithLabel } from '../../components/forms';
import Label from '../../components/label';
import loaderHoc from '../../utils/hocs/loader';
import * as styles from './styles.css';
import { ICampaign } from '../../interfaces';

interface ICampaignEditPageProps {
  saveCampaign: (campaign: ICampaign) => void;
  getCampaign: (id: string) => void;
  resetCampaign: () => void;
  campaign: ICampaign | null;
  redirect: (path: string) => void;
  match: {
    params: {
      id: string;
    };
  };
}
const CampaignEditPage: React.FC<ICampaignEditPageProps> = (props) => {
  const {
    saveCampaign,
    getCampaign,
    resetCampaign,
    campaign,
    redirect,
    match: {
      params: { id },
    },
  } = props;

  useEffect(() => {
    if (id) {
      getCampaign(id);
    }
    return () => resetCampaign();
  }, []);

  const [name, setName] = useState(campaign ? campaign.name : '');
  const [description, setDescription] = useState(campaign ? campaign.description : '');

  return (
    <Page>
      <Card>
        <CardHeader flex>
          Create campaign
          <div className={styles.controls}>
            <Button onClick={() => redirect(ROUTES.CAMPAIGNS)} kind={KIND.DANGER}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                saveCampaign({
                  ...campaign,
                  name,
                  description,
                })
              }
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
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <Label>Description</Label>
          <RichText value={description} onChange={setDescription} />
        </CardBody>
      </Card>
    </Page>
  );
};

interface IState {
  campaigns: {
    currentCampaign: ICampaign;
  };
}
const mapStateToProps = ({ campaigns }: IState) => ({
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
)(
  loaderHoc({
    init: (props: ICampaignEditPageProps) => {
      const {
        getCampaign,
        resetCampaign,
        match: {
          params: { id },
        },
      } = props;

      useEffect(() => {
        if (id) {
          getCampaign(id);
        }
        return () => resetCampaign();
      }, []);
    },
    check: (props: ICampaignEditPageProps) => !props.match.params.id || !!props.campaign,
  })(CampaignEditPage),
);
