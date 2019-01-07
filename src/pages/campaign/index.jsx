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
import { Button, KIND as BIN_KIND } from '../../components/button';
import {
  List,
  ListItem,
} from '../../components/list';
import Page from '../../components/page';
import Loader from '../../components/loader';
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
    loading,
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

  return (
    <Page>
      <Card className={styles.card}>
        <CardHeader>
          {campaign?.name}
        </CardHeader>
        <CardBody>
          {campaign?.description}
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
          {loading && (
            <Loader fillParent />
          )}

          {/* Scenarios */}
          <List>
            {scenarios.map(item => (
              <ListItem
                className={styles.listItem}
                key={item.id}
                onClick={() => redirect(`${ROUTES.SCENARIOS}/${item.id}`)}
              >
                {item.name}
                <span className={styles.controls}>
                  <Button kind={BIN_KIND.DANGER}>
                    <i className="fas fa-trash-alt" />
                  </Button>
                </span>
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
  loading: PropTypes.bool,
};
CampaignPage.defaultProps = {
  campaign: null,
  scenarios: [],
  loading: false,
};

const mapStateToProps = ({ campaigns, scenarios }) => ({
  campaign: campaigns.currentCampaign,
  scenarios: scenarios.list,
  loading: campaigns.loading,
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
