import React, {
  useState,
  // useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as scenariosAction from '../../actions/scenarios';
import * as scenesAction from '../../actions/scenes';
import * as commonActions from '../../actions/common';
import * as resourcesActions from '../../actions/resources';
import {
  Card,
  CardHeader,
  CardBody,
} from '../../components/card';
// import {
//   List,
//   ListItem,
// } from '../../components/list';
import Page from '../../components/page';
import Alert, { TYPES } from '../../components/alert';
import {
  InputWithLabel,
  TextAriaWithLabel,
  SelectWithLabel,
} from '../../components/forms';
// import { ROUTES } from '../../constants';
import {
  Button,
  KIND,
} from '../../components/button';
import styles from './styles.css';
import { ROUTES } from '../../constants';

const FILE_TYPES = {
  IMAGE: 'IMAGE',
};
const TYPES_OPTIONS = [
  {
    value: FILE_TYPES.IMAGE,
    text: 'Image',
  },
];

const ResourceEditPage = (props) => {
  const {
    // getScenario,
    // getScenes,
    // resetScenario,
    // resetSceneList,
    // scenario,
    redirect,
    // scenes,
    // match: {
    //   params: {
    //     id,
    //   },
    // },
    error,
    save,
  } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(FILE_TYPES.IMAGE);
  const [files, setFile] = useState('');

  // useEffect(() => {
  //   if (id) {
  //     getScenario(id);
  //   }
  //   return () => resetScenario();
  // }, []);
  // useEffect(() => {
  //   if (id) {
  //     getScenes(id);
  //   }
  //   return () => resetSceneList();
  // }, []);

  // if (!scenario) {
  //   // TODO: use loader
  //   return null;
  // }

  return (
    <Page>
      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            Resources
            <div className={styles.controls}>
              <Button
                onClick={() => redirect(ROUTES.RESOURCES)}
                kind={KIND.DANGER}
              >
                Cancel
              </Button>
              <Button
                onClick={() => save({
                  name,
                  description,
                  type,
                  file: files.data[0],
                })}
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
          <InputWithLabel
            label="Name"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
          />
          <TextAriaWithLabel
            label="Description"
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
          />
          <SelectWithLabel
            label="Type"
            id="type"
            value={type}
            options={TYPES_OPTIONS}
            onChange={e => setType(e.target.value)}
            fullWidth
          />

          {type === FILE_TYPES.IMAGE && (
            <InputWithLabel
              type="file"
              label="Select file"
              id="file"
              value={files.value}
              onChange={e => setFile({
                data: e.target.files,
                value: e.target.value,
              })}
              fullWidth
            />
          )}
        </CardBody>
      </Card>
    </Page>
  );
};

ResourceEditPage.propTypes = {
  redirect: PropTypes.func.isRequired,
  // getScenes: PropTypes.func.isRequired,
  // resetSceneList: PropTypes.func.isRequired,
  // resetScenario: PropTypes.func.isRequired,
  // getScenario: PropTypes.func.isRequired,
  scenario: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  // scenes: PropTypes.arrayOf(PropTypes.shape({
  //   name: PropTypes.string,
  //   description: PropTypes.string,
  // })),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  save: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Error),
};
ResourceEditPage.defaultProps = {
  scenario: null,
  error: null,
};

const mapStateToProps = ({ resources }) => ({
  error: resources.error,
});

const mapDispatchToProps = {
  getScenes: scenesAction.getScenes,
  resetSceneList: scenesAction.resetSceneList,
  getScenario: scenariosAction.fetchScenario,
  resetScenario: scenariosAction.resetScenario,
  redirect: commonActions.redirect,
  save: resourcesActions.saveResource,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResourceEditPage);
