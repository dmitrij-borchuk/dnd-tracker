import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import RichText from '../../components/richText';
import * as scenesAction from '../../actions/scenes';
import * as commonActions from '../../actions/common';
import { ROUTES } from '../../constants';
import { Card, CardHeader, CardBody } from '../../components/card';
import Loader from '../../components/loader';
import { Button, KIND } from '../../components/button';
import { InputWithLabel } from '../../components/forms';
import Alert, { TYPES } from '../../components/alert';
import Label from '../../components/label';
import loaderHoc from '../../utils/hocs/loader';
import * as styles from './styles.css';
import { IScene, IRawScene } from '../../interfaces';

interface ISceneEditPageProps {
  saveScene: (scene: IScene | IRawScene) => void;
  scene: IScene | null;
  redirect: (url: string) => void;
  loading: boolean;
  error: Error;
  match: {
    params: {
      scenarioId: string;
      id: string;
    };
  };
  getScene: (id: string) => void;
  resetScene: () => void;
}

const SceneEditPage: React.FC<ISceneEditPageProps> = (props) => {
  const {
    saveScene,
    scene,
    redirect,
    loading,
    error,
    match: {
      params: { scenarioId, id },
    },
  } = props;
  const cancelUrl = id ? `${ROUTES.SCENES}/${id}` : `${ROUTES.SCENARIOS}/${scenarioId}`;

  const [name, setName] = useState(scene?.name || '');
  const [description, setDescription] = useState(scene?.description || '');
  const isEmpty = name === '';

  return (
    <div className="page-content">
      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            {id ? 'Edit' : 'Create'}
            &nbsp;scene
            <div className={styles.controls}>
              <Button onClick={() => redirect(cancelUrl)} kind={KIND.DANGER}>
                Cancel
              </Button>
              <Button
                onClick={() =>
                  saveScene({
                    ...scene,
                    scenarioId,
                    name,
                    description,
                  })
                }
                disabled={isEmpty}
              >
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {error && <Alert type={TYPES.DANGER}>{error.message}</Alert>}
          {loading && <Loader fillParent />}
          <InputWithLabel label="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          {/* <TextAriaWithLabel
            label="Description"
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
          /> */}
          <Label>Description</Label>
          <RichText value={description} onChange={setDescription} />
        </CardBody>
      </Card>
    </div>
  );
};

// SceneEditPage.propTypes = {
//   redirect: PropTypes.func.isRequired,
//   saveScene: PropTypes.func.isRequired,
//   scene: PropTypes.shape({
//     name: PropTypes.string,
//     description: PropTypes.string,
//   }),
//   loading: PropTypes.bool,
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string,
//     }),
//   }).isRequired,
//   error: PropTypes.instanceOf(Error),
// };
// SceneEditPage.defaultProps = {
//   scene: null,
//   loading: false,
//   error: null,
// };

interface IState {
  scenes: {
    currentScene: IScene;
    loading: boolean;
    error: Error;
  };
}

const mapStateToProps = ({ scenes }: IState) => ({
  scene: scenes.currentScene,
  loading: scenes.loading,
  error: scenes.error,
});

const mapDispatchToProps = {
  getScene: scenesAction.fetchScene,
  saveScene: scenesAction.saveScene,
  resetScene: scenesAction.resetScene,
  redirect: commonActions.redirect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  loaderHoc({
    init: (props: ISceneEditPageProps) => {
      const {
        getScene,
        resetScene,
        match: {
          params: { id },
        },
      } = props;

      useEffect(() => {
        if (id) {
          getScene(id);
        }
        return () => resetScene();
      }, []);
    },
    check: (props: ISceneEditPageProps) => !props.match.params.id || !!props.scene,
  })(SceneEditPage),
);
