import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as commonActions from '../../actions/common';
import * as resourcesActions from '../../actions/resources';
import { ROUTES } from '../../constants';
import loaderHoc from '../../utils/hocs/loader';
import { Card, CardHeader, CardBody } from '../../components/card';
import Page from '../../components/page';
import { Button, KIND } from '../../components/button';
import styles from './styles.css';

const LinkedResourcePage = (props) => {
  const {
    match: {
      params: {
        id,
      },
    },
    redirect,
    resource,
  } = props;

  return (
    <Page>
      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            {resource.name}
            <div className={styles.controls}>
              <Button
                onClick={() => redirect(`${ROUTES.SCENES}/${id}`)}
                kind={KIND.DANGER}
              >
                Cancel
              </Button>
              {/* <Button
                onClick={() => save({
                  linkedTo: id,
                  resourceId,
                })}
                kind={KIND.PRIMARY}
                disabled={!resourceId}
              >
                Save
              </Button> */}
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <img
            src={resource.url}
            alt="Resource"
            className={styles.bigImg}
          />
        </CardBody>
      </Card>
    </Page>
  );
};

LinkedResourcePage.propTypes = {
  redirect: PropTypes.func.isRequired,
  resource: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    url: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
LinkedResourcePage.defaultProps = {
  resource: null,
};

const mapStateToProps = ({ resources }) => ({
  resource: resources.current,
});

const mapDispatchToProps = {
  redirect: commonActions.redirect,
  getResource: resourcesActions.getResource,
  resetResource: resourcesActions.resetResource,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(loaderHoc({
  init: (props) => {
    const {
      match: {
        params: {
          id,
        },
      },
      getResource,
      resetResource,
    } = props;

    useEffect(() => {
      getResource(id);
      return () => resetResource();
    }, []);
  },
  check: props => !!props.resource,
})(LinkedResourcePage));
