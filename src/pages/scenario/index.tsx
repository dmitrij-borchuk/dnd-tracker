import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import * as scenariosAction from '../../actions/scenarios'
import * as scenesAction from '../../actions/scenes'
import * as commonActions from '../../actions/common'
import * as linkedResources from '../../actions/linkedResources'
import { Card, CardHeader, CardBody, CardControls } from '../../components/card'
import { Button, KIND as BTN_KIND } from '../../components/button'
import SanitizeHtml from '../../components/sanitizeHtml'
import { List, ListItem } from '../../components/list'
import Page from '../../components/page'
import Loader from '../../components/loader'
import { Modal, ModalHeader, ModalBody, ModalControls } from '../../components/modal'
import { stopPropagation } from '../../utils'
import { ROUTES } from '../../constants'
import { IScenario } from '../../interfaces/scenario'
import * as styles from './styles.css'
import { IScene, ILinkedResource, IStore } from '../../interfaces'
import { DropMenu } from '../../components/dropMenu/dropMenu'
import { ResourceSelector } from '../../components/resourceSelector/ResourceSelector'
import { IResource } from '../../interfaces/resource'
import * as linkedResourcesActions from '../../actions/linkedResources'
import { LinkedResourcesList } from '../../components/linkedResourcesList/LinkedResourcesList'

const resourcesSelector = ({ resources }: IStore) => resources.list
interface IScenarioPageProps {
  getScenario: (id: string) => void
  getScenes: (id: string) => void
  resetScenario: () => void
  resetSceneList: () => void
  scenario: IScenario
  redirect: (url: string) => void
  scenes: IScene[]
  removeScene: (id: string) => void
  scenesLoading: boolean
  linkResource: (data: ILinkedResource) => void
  match: {
    params: {
      id: string
    }
  }
}
const ScenarioPage = (props: IScenarioPageProps) => {
  const {
    getScenario,
    getScenes,
    resetScenario,
    resetSceneList,
    scenario,
    redirect,
    scenes,
    removeScene,
    scenesLoading,
    linkResource,
    match: {
      params: { id },
    },
  } = props
  const resources = useSelector(resourcesSelector)
  const dispatch = useDispatch()
  const linkedKeys = Object.keys(resources)
  const [deleteItem, setItemToDelete] = useState<IScene | null>(null)
  const [showResourceSelector, setShowResourceSelector] = useState(false)
  const onResourceSelect = useCallback((res: IResource) => {
    linkResource({
      linkedTo: id,
      resourceId: res.id,
    })
    setShowResourceSelector(false)
  }, [])

  useEffect(() => {
    if (id) {
      getScenario(id)
    }

    dispatch(linkedResourcesActions.getLinkedResources(id))
    return () => {
      resetScenario()
      dispatch(linkedResourcesActions.resetLinkedResourcesList())
    }
  }, [])
  useEffect(() => {
    if (id) {
      getScenes(id)
    }
    return () => resetSceneList()
  }, [])

  if (!scenario) {
    return <Loader fillParent />
  }

  return (
    <>
      <Page>
        <Card className={styles.card}>
          <CardHeader flex>
            {scenario.name}
            <CardControls>
              <DropMenu options={[{ label: 'Resource', onClick: () => setShowResourceSelector(true) }]}>
                <Button>Add</Button>
              </DropMenu>
              <Button onClick={() => redirect(`${ROUTES.SCENARIOS_EDIT}/${scenario.campaignId}/${id}`)}>Edit</Button>
            </CardControls>
          </CardHeader>
          <CardBody>
            <SanitizeHtml>{scenario.description}</SanitizeHtml>
          </CardBody>
        </Card>

        <Card className={styles.card}>
          <CardHeader flex>
            Scenes
            <CardControls>
              <Button onClick={() => redirect(`${ROUTES.SCENES_EDIT}/${id}`)}>Add</Button>
            </CardControls>
          </CardHeader>
          <CardBody>
            {scenesLoading && <Loader fillParent />}
            <List>
              {scenes.map((item) => (
                <ListItem
                  className={styles.listItem}
                  key={item.id}
                  onClick={() => redirect(`${ROUTES.SCENES}/${item.id}`)}
                >
                  {item.name}
                  <span className={styles.controls}>
                    <Button kind={BTN_KIND.DANGER} onClick={stopPropagation(() => setItemToDelete(item))}>
                      <i className="fas fa-trash-alt" />
                    </Button>
                  </span>
                </ListItem>
              ))}
            </List>
          </CardBody>
        </Card>

        <LinkedResourcesList objectId={id} />
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
                setItemToDelete(null)
                removeScene(deleteItem.id)
              }}
            >
              Yes
            </Button>
          </ModalControls>
        </Modal>
      )}
      {showResourceSelector && (
        <Modal>
          <ModalHeader onClose={() => setShowResourceSelector(false)} withClose>
            Add resource
          </ModalHeader>
          <ModalBody>
            <ResourceSelector onSelect={onResourceSelect} />
          </ModalBody>
        </Modal>
      )}
    </>
  )
}

// ScenarioPage.propTypes = {
//   redirect: PropTypes.func.isRequired,
//   getScenes: PropTypes.func.isRequired,
//   resetSceneList: PropTypes.func.isRequired,
//   resetScenario: PropTypes.func.isRequired,
//   removeScene: PropTypes.func.isRequired,
//   getScenario: PropTypes.func.isRequired,
//   scenesLoading: PropTypes.bool.isRequired,
//   scenario: PropTypes.shape({
//     name: PropTypes.string,
//     description: PropTypes.string,
//   }),
//   scenes: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string,
//     description: PropTypes.string,
//   })),
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string,
//     }),
//   }).isRequired,
// };
// ScenarioPage.defaultProps = {
//   scenario: null,
//   scenes: [],
// };

interface IState {
  scenarios: {
    currentScenario: IScenario
  }
  scenes: {
    list: IScene[]
    loading: boolean
  }
}
const mapStateToProps = ({ scenarios, scenes }: IState) => ({
  scenario: scenarios.currentScenario,
  scenes: scenes.list,
  scenesLoading: scenes.loading,
})

const mapDispatchToProps = {
  getScenes: scenesAction.getScenes,
  resetSceneList: scenesAction.resetSceneList,
  removeScene: scenesAction.removeScene,
  getScenario: scenariosAction.fetchScenario,
  resetScenario: scenariosAction.resetScenario,
  redirect: commonActions.redirect,
  linkResource: linkedResources.saveLinkedResource,
}

export default connect(mapStateToProps, mapDispatchToProps)(ScenarioPage)
