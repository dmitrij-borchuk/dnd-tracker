import * as React from 'react';
import {
  useState,
} from 'react';
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
import Page from '../../components/page';
import Alert, { TYPES } from '../../components/alert';
import {
  TextAriaWithLabel,
  SelectWithLabel,
  Field,
} from '../../components/forms';
import {
  Button,
  KIND,
} from '../../components/button';
import { ROUTES } from '../../constants';
import Loader from '../../components/loader';
import { HTMLInputEvent } from '../../interfaces/fileEvent';
import * as styles from './styles.css';

enum FILE_TYPES {
  IMAGE = 'IMAGE'
}
const TYPES_OPTIONS = [
  {
    value: FILE_TYPES.IMAGE,
    text: 'Image',
  },
];

const validator = (config, values): Record<string, string> => {
  const errors = {}
  const items = Object.keys(config)
  items.forEach((item) => {
    if (config[item].required && !values[item]) {
      errors[item] = 'Required'
    }
  })
  return errors
}

const hasErrors = (errors) => Object.keys(errors).length > 0

interface IResource {
  name: string,
  description: string,
  type: FILE_TYPES,
  file: File,
}
interface IResourceEditPageProps {
  redirect: (path: string) => void,
  error: Error,
  save: (resource: IResource) => void,
  loading: boolean,
}

const ResourceEditPage: React.FC<IResourceEditPageProps> = (props) => {
  const {
    redirect,
    error,
    save,
    loading,
  } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(FILE_TYPES.IMAGE);
  const [files, setFile] = useState<{ data: FileList | null, value: string }>();
  const fieldsValidationConfig = {
    name: {
      required: true,
    },
    file: {
      required: type === FILE_TYPES.IMAGE,
    },
  }
  const errors = validator(fieldsValidationConfig, {
    name,
    file: files && files.data[0],
  })
  const isValid = !hasErrors(errors)

  if (loading) {
    return <Loader fillParent />
  }
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
                disabled={!isValid}
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
          <Field
            error={errors.name}
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
            <Field
              error={errors.file}
              type="file"
              label="Select file"
              id="file"
              value={files && files.value}
              onChange={(e: HTMLInputEvent) => setFile({
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

// ResourceEditPage.propTypes = {
//   redirect: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
//   scenario: PropTypes.shape({
//     name: PropTypes.string,
//     description: PropTypes.string,
//   }),
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string,
//     }),
//   }).isRequired,
//   save: PropTypes.func.isRequired,
//   error: PropTypes.instanceOf(Error),
// };
// ResourceEditPage.defaultProps = {
//   scenario: null,
//   error: null,
//   loading: false,
// };

const mapStateToProps = ({ resources }) => ({
  error: resources.error,
  loading: resources.loading,
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
