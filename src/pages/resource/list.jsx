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
    list,
  } = props;

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
            {list.map(item => (
              <ListItem
                className={styles.listItem}
                key={item.id}
              >
                {item.name}
                <a
                  href={item.url}
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
  list: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  })),
};
ResourceEditPage.defaultProps = {
  list: [],
};

const mapStateToProps = ({ resources }) => ({
  list: resources.list,
});

const mapDispatchToProps = {
  redirect: commonActions.redirect,
  getList: resourcesAction.getResources,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResourceEditPage);
