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
    removeScenario,
    error,
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

  return (
    <>
      <Page>
        <Card className={styles.card}>
          <CardHeader>
            {campaign ?.name}
          </CardHeader>
          <CardBody>
            {campaign ?.description}
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
            {error && (
              <Alert type={TYPES.DANGER}>
                {error.message}
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
};
CampaignPage.defaultProps = {
  campaign: null,
  scenarios: [],
  scenariosLoading: false,
};

const mapStateToProps = ({ campaigns, scenarios }) => ({
  campaign: campaigns.currentCampaign,
  scenariosLoading: scenarios.loading,
  scenarios: scenarios.list,
  error: scenarios.error,
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
