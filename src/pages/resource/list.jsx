import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as resourcesAction from '../../actions/resources';
import * as commonActions from '../../actions/common';
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
import { ROUTES } from '../../constants';

import styles from './styles.css';

const ResourceEditPage = (props) => {
  const {
    getList,
    redirect,
    resources,
  } = props;
  const keys = Object.keys(resources);

  useEffect(() => {
    getList();
  }, []);

  return (
    <Page>
      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            Resources
            <div className={styles.controls}>
              <Button
                onClick={() => redirect(ROUTES.RESOURCES_EDIT)}
              >
                Add
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <List>
            {keys.map(key => (
              <ListItem
                className={styles.listItem}
                key={resources[key].id}
              >
                {resources[key].name}
                <a
                  href={resources[key].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.controls}
                >
                  <Button>
                    <i className="fas fa-external-link-alt" />
                  </Button>
                </a>
              </ListItem>
            ))}
          </List>
        </CardBody>
      </Card>
    </Page>
  );
};

ResourceEditPage.propTypes = {
  redirect: PropTypes.func.isRequired,
  getList: PropTypes.func.isRequired,
  resources: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string,
  })),
};
ResourceEditPage.defaultProps = {
  resources: {},
};

const mapStateToProps = ({ resources }) => ({
  resources: resources.list,
});

const mapDispatchToProps = {
  redirect: commonActions.redirect,
  getList: resourcesAction.getResources,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResourceEditPage);
