import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as campaignsAction from '../../actions/campaigns';
import * as scenariosAction from '../../actions/scenarios';
import * as commonActions from '../../actions/common';
import { ROUTES } from '../../constants';
import { stopPropagation } from '../../utils';
import { Card, CardHeader, CardBody } from '../../components/card';
import { Button, KIND as BTN_KIND } from '../../components/button';
import { List, ListItem } from '../../components/list';
import Alert, { TYPES } from '../../components/alert';
import SanitizeHtml from '../../components/sanitizeHtml';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalControls,
} from '../../components/modal';
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
    scenariosLoading,
    loading,
    removeScenario,
    error,
    scenariosError,
    match: {
      params: {
        id,
      },
    },
  } = props;
  const [deleteItem, setItemToDelete] = useState(null);

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
    return <Loader fillParent />
  }

  return (
    <>
      <Page>
        <Card className={styles.card}>
          <CardHeader className={styles.listHeader}>
            {campaign.name}
            <div className={styles.controls}>
              <Button onClick={() => redirect(`${ROUTES.CAMPAIGNS_EDIT}/${id}`)}>Edit</Button>
            </div>
          </CardHeader>
          <CardBody>
            {error && (
              <Alert type={TYPES.DANGER}>
                {error.message}
              </Alert>
            )}
            {loading && (
              <Loader fillParent />
            )}
            <SanitizeHtml>{campaign.description || ''}</SanitizeHtml>
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
            {scenariosError && (
              <Alert type={TYPES.DANGER}>
                {scenariosError.message}
              </Alert>
            )}
            {scenariosLoading && (
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
                    <Button
                      kind={BTN_KIND.DANGER}
                      onClick={stopPropagation(() => setItemToDelete(item))}
                    >
                      <i className="fas fa-trash-alt" />
                    </Button>
                  </span>
                </ListItem>
              ))}
            </List>
          </CardBody>
        </Card>
      </Page>

      {deleteItem && (
        <Modal>
          <ModalHeader>{deleteItem.name}</ModalHeader>
          <ModalBody>Do you really want to delete this?</ModalBody>
          <ModalControls>
            <Button onClick={() => setItemToDelete(null)}>No</Button>
            <Button
              kind={BTN_KIND.DANGER}
              onClick={() => {
                setItemToDelete(null);
                removeScenario(deleteItem.id);
              }}
            >
              Yes
            </Button>
          </ModalControls>
        </Modal>
      )}
    </>
  );
};

CampaignPage.propTypes = {
  redirect: PropTypes.func.isRequired,
  removeScenario: PropTypes.func.isRequired,
  resetCampaign: PropTypes.func.isRequired,
  resetScenarioList: PropTypes.func.isRequired,
  getCampaign: PropTypes.func.isRequired,
  getScenarios: PropTypes.func.isRequired,
  loading: PropTypes.bool,
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
  scenariosLoading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  scenariosError: PropTypes.instanceOf(Error),
};
CampaignPage.defaultProps = {
  campaign: null,
  scenarios: [],
  scenariosLoading: false,
  loading: false,
};

const mapStateToProps = ({ campaigns, scenarios }) => ({
  campaign: campaigns.currentCampaign,
  error: campaigns.error,
  loading: campaigns.loading,
  scenariosLoading: scenarios.loading,
  scenarios: scenarios.list,
  scenariosError: scenarios.error,
});

const mapDispatchToProps = {
  getCampaign: campaignsAction.fetchCampaign,
  resetCampaign: campaignsAction.resetCampaign,
  removeScenario: scenariosAction.removeScenario,
  getScenarios: scenariosAction.getScenarios,
  resetScenarioList: scenariosAction.resetScenarioList,
  redirect: commonActions.redirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignPage);
