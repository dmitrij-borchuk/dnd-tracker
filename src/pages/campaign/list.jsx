
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as campaignsAction from '../../actions/campaigns';
import * as commonActions from '../../actions/common';
import { ROUTES } from '../../constants';
import { stopPropagation } from '../../utils';
import {
  Card,
  CardHeader,
  CardBody,
} from '../../components/card';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalControls,
} from '../../components/modal';
import { Button, KIND as BTN_KIND } from '../../components/button';
import { List, ListItem } from '../../components/list';
import Page from '../../components/page';
import Alert, { TYPES } from '../../components/alert';
import Loader from '../../components/loader';
import styles from './styles.css';

const CampaignsListPage = (props) => {
  const {
    getList,
    list,
    redirect,
    error,
    loading,
    removeCampaign,
  } = props;
  const [deleteItem, setItemToDelete] = useState(null);

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Page>
        <Card>
          <CardHeader>
            <div className={styles.listHeader}>
              Campaigns

              <div className={styles.controls}>
                <Button onClick={() => redirect(ROUTES.CAMPAIGNS_EDIT)}>Add</Button>
              </div>
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
            <List>
              {list.map(item => (
                <ListItem
                  className={styles.listItem}
                  key={item.id}
                  onClick={() => redirect(`${ROUTES.CAMPAIGNS}/${item.id}`)}
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
                removeCampaign(deleteItem.id);
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

CampaignsListPage.propTypes = {
  getList: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  removeCampaign: PropTypes.func.isRequired,
  scenario: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool,
};
CampaignsListPage.defaultProps = {
  scenario: null,
  error: null,
  loading: false,
};

const mapStateToProps = ({ campaigns }) => ({
  list: campaigns.list,
  error: campaigns.error,
  loading: campaigns.loading,
});

const mapDispatchToProps = {
  getList: campaignsAction.getCampaigns,
  removeCampaign: campaignsAction.removeCampaign,
  redirect: commonActions.redirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignsListPage);
