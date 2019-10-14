import * as React from 'react';
import {
  useState,
} from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
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
import { IStore } from '../../interfaces/store';
import { mapDispatchToActions } from '../../utils/common';

enum FILE_TYPES {
  IMAGE = 'IMAGE'
}

interface IResource {
  name: string,
  description: string,
  type: FILE_TYPES,
  file: File,
}
interface IResourceEditPageProps {
}
interface IValidationItemConfig {
  required?: boolean
}
interface IFileState {
  data: File
  value: string
}
type ValidationConfig<T> = {
  [P in keyof T]?: IValidationItemConfig;
}

const TYPES_OPTIONS = [
  {
    value: FILE_TYPES.IMAGE,
    text: 'Image',
  },
];

const validator = (config: ValidationConfig<IResource>, values: Partial<IResource>): Record<string, string> => {
  const errors: Record<string, string> = {}
  const items = Object.keys(values) as (keyof IResource)[]
  items.forEach((item) => {
    const itemConfig = config[item]
    if (itemConfig && itemConfig.required && !values[item]) {
      errors[item] = 'Required'
    }
  })
  return errors
}

const hasErrors = (errors: Record<string, string>) => Object.keys(errors).length > 0

const selector = ({ resources }: IStore) => ({
  error: resources.error,
  loading: resources.loading,
})

export const ResourceEditPage: React.FC<IResourceEditPageProps> = () => {
  const {
    error,
    loading,
  } = useSelector(selector)
  const dispatch = useDispatch()
  const [
    redirect,
    save,
  ] = mapDispatchToActions(dispatch, [
    commonActions.redirect,
    resourcesActions.saveResource,
  ])
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(FILE_TYPES.IMAGE);
  const [files, setFile] = useState<IFileState>();
  const onSubmit = React.useCallback(() => {
    if (!files || !files.data) {
      return
    }
    save({
      name,
      description,
      type,
      file: files.data,
    })
  }, [name, description, type, files])
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
    file: files && files.data,
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
                onClick={onSubmit}
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
              onChange={(e: HTMLInputEvent) => {
                if (!e.target.files) {
                  setFile(undefined)
                } else {
                  setFile({
                    data:e.target.files[0],
                    value: e.target.value,
                  })
                }
              }}
              fullWidth
            />
          )}
        </CardBody>
      </Card>
    </Page>
  );
};
