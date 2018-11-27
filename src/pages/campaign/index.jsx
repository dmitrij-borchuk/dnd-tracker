import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as campaignsAction from '../../actions/campaigns';
import * as scenariosAction from '../../actions/scenarios';
import * as commonActions from '../../actions/common';
import { ROUTES } from '../../constants';
import {
  Card,
  CardHeader,
  CardBody,
} from '../../components/card';
import { Button } from '../../components/button';
import {
  List,
  ListItem,
} from '../../components/list';
import Page from '../../components/page';
import styles from './styles.css';

const CampaignPage = (props) => {
  const {
    getCampaign,
    getScenarios,
    resetCampaign,
    resetScenarioList,
    campaign,
    scenarios,
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
  useEffect(() => {
    if (id) {
      getScenarios(id);
    }
    return () => resetScenarioList();
  }, []);

  if (!campaign) {
    // TODO: Use loader
    return null;
  }

  return (
    <Page>
      <Card className={styles.card}>
        <CardHeader>
          {campaign.name}
        </CardHeader>
        <CardBody>
          {campaign.description}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            Scenarios
            <div className={styles.controls}>
              <Button
                onClick={() => redirect(`${ROUTES.SCENARIOS_EDIT}/${id}`)}
              >
                Add
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <List>
            {scenarios.map(item => (
              <ListItem
                className={styles.listItem}
                key={item.id}
                onClick={() => redirect(`${ROUTES.SCENARIOS}/${id}/${item.id}`)}
              >
                {item.name}
              </ListItem>
            ))}
          </List>
        </CardBody>
      </Card>
    </Page>
  );
};

CampaignPage.propTypes = {
  redirect: PropTypes.func.isRequired,
  resetCampaign: PropTypes.func.isRequired,
  resetScenarioList: PropTypes.func.isRequired,
  getCampaign: PropTypes.func.isRequired,
  getScenarios: PropTypes.func.isRequired,
  campaign: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  scenarios: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  })),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
CampaignPage.defaultProps = {
  campaign: null,
  scenarios: [],
};

const mapStateToProps = ({ campaigns, scenarios }) => ({
  campaign: campaigns.currentCampaign,
  scenarios: scenarios.list,
});

const mapDispatchToProps = {
  getCampaign: campaignsAction.fetchCampaign,
  resetCampaign: campaignsAction.resetCampaign,
  getScenarios: scenariosAction.getScenarios,
  resetScenarioList: scenariosAction.resetScenarioList,
  redirect: commonActions.redirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignPage);
