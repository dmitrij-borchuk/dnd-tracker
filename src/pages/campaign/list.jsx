
import React, {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as campaignsAction from '../../actions/campaigns';
import * as commonActions from '../../actions/common';
import { ROUTES } from '../../constants';
import {
  Card,
  CardHeader,
  CardBody,
} from '../../components/card';
import { Button } from '../../components/button';
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
  } = props;

  useEffect(() => {
    getList();
  }, []);

  return (
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
                key={item.id || item.key}
                onClick={() => redirect(`${ROUTES.CAMPAIGNS}/${item.id}`)}
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

CampaignsListPage.propTypes = {
  getList: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
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
  redirect: commonActions.redirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignsListPage);
