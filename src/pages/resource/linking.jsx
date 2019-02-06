import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as commonActions from '../../actions/common';
import * as resourcesActions from '../../actions/resources';
import * as linkedResources from '../../actions/linkedResources';
import { ROUTES } from '../../constants';
import { Card, CardHeader, CardBody } from '../../components/card';
import Page from '../../components/page';
import Alert, { TYPES } from '../../components/alert';
import { SelectWithLabel } from '../../components/forms';
import { Button, KIND } from '../../components/button';
import Loader from '../../components/loader';
import styles from './styles.css';

const ResourceEditPage = (props) => {
  const {
    error,
    save,
    getResources,
    resources,
    resourcesLoading,
    redirect,
    match: {
      params: {
        id,
      },
    },
  } = props;
  const loading = resourcesLoading;
  const resourcesOptions = resources.map(item => ({
    value: item.id,
    text: item.name,
  }));
  resourcesOptions.unshift({
    value: '',
    text: 'Select resource',
  });
  const [resourceId, setResource] = useState('');
  const resource = resources.find(item => item.id === resourceId);

  useEffect(() => {
    getResources();
  }, []);

  return (
    <Page>
      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            Resource linking
            <div className={styles.controls}>
              <Button
                onClick={() => redirect(`${ROUTES.SCENES}/${id}`)}
                kind={KIND.DANGER}
              >
                Cancel
              </Button>
              <Button
                onClick={() => save({
                  linkedTo: id,
                  resourceId,
                })}
                kind={KIND.PRIMARY}
                disabled={!resourceId}
              >
                Save
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
          {loading && (
            <Loader fillParent />
          )}

          <SelectWithLabel
            label="Type"
            id="type"
            value={resourceId}
            options={resourcesOptions}
            onChange={e => setResource(e.target.value)}
            fullWidth
          />

          {resource && (
            <img
              src={resource.url}
              alt="current resource"
              className={styles.image}
            />
          )}
        </CardBody>
      </Card>
    </Page>
  );
};

ResourceEditPage.propTypes = {
  redirect: PropTypes.func.isRequired,
  getResources: PropTypes.func.isRequired,
  scenario: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  resources: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    url: PropTypes.string,
  })),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  save: PropTypes.func.isRequired,
  resourcesLoading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error),
};
ResourceEditPage.defaultProps = {
  scenario: null,
  error: null,
  resources: [],
};

const mapStateToProps = ({ resources }) => ({
  error: resources.error,
  resources: resources.list,
  resourcesLoading: resources.loading,
});

const mapDispatchToProps = {
  redirect: commonActions.redirect,
  save: linkedResources.saveLinkedResource,
  getResources: resourcesActions.getResources,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResourceEditPage);
