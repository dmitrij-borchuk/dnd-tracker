import * as React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as campaignsAction from '../../actions/campaigns'
import * as scenariosAction from '../../actions/scenarios'
import * as commonActions from '../../actions/common'
import { ROUTES } from '../../constants'
import { stopPropagation } from '../../utils'
import { Card, CardHeader, CardBody } from '../../components/card'
import { Button, KIND as BTN_KIND } from '../../components/button'
import { List, ListItem } from '../../components/list'
import Alert, { TYPES } from '../../components/alert'
import SanitizeHtml from '../../components/sanitizeHtml'
import { Modal, ModalHeader, ModalBody, ModalControls } from '../../components/modal'
import Page from '../../components/page'
import Loader from '../../components/loader'
// import * as styles from './styles.css'
import { IStore } from '../../interfaces/store'
import { IScenario } from '../../interfaces/scenario'
import { mapDispatchToActions } from '../../utils/common'
import { useParams } from 'react-router-dom'
import { IContainer } from '../../interfaces/container'
import { fetchContainer, resetContainersStore, fetchContainers } from '../../actions/containers'
import * as linkedResourcesActions from '../../actions/linkedResources'
import { IResource } from '../../interfaces/resource'
import { ILinkedResource } from '../../interfaces'

const selector = ({ containers, resources, linkedResources }: IStore) => ({
  error: containers.error,
  list: containers.list,
  listLoading: containers.listLoading,
  container: containers.current,
  redirect: commonActions.redirect,
  resources: resources.list,
  linkedResources: linkedResources.list,
})

interface IContainerProps {
  match: {
    params: {
      id: string
    }
  }
}
export const Container: React.FC<IContainerProps> = (props) => {
  const { error, listLoading, list, container, resources, linkedResources } = useSelector(selector)
  const linkedResourcesList = Object.values(linkedResources)
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>()

  const [removeScenario] = mapDispatchToActions(dispatch, [scenariosAction.removeScenario])
  const [deleteItem, setItemToDelete] = useState<IContainer | null>(null)
  const [deleteResource, setResourceToDelete] = useState<ILinkedResource | null>(null)
  const onEdit = React.useCallback(() => {
    dispatch(commonActions.redirect(`${ROUTES.CONTAINER_EDIT}/${id}`))
  }, [id])
  const onAddClick = React.useCallback(() => {
    dispatch(commonActions.redirect(`${ROUTES.CONTAINER_CREATE}/${id}`))
  }, [id])
  const onItemClick = React.useCallback((item: IContainer) => {
    dispatch(commonActions.redirect(`/${item.id}`))
  }, [])
  const onAddResource = React.useCallback(() => {
    dispatch(commonActions.redirect(`${ROUTES.RESOURCE_LINKING}/${id}`))
  }, [id])
  const onResourceClick = React.useCallback((item: ILinkedResource) => {
    dispatch(commonActions.redirect(`${ROUTES.RESOURCE_LINKED}/${item.id}`))
  }, [])

  useEffect(() => {
    dispatch(fetchContainer(id))
    dispatch(fetchContainers(id))
    return () => {
      dispatch(resetContainersStore())
    }
  }, [id])
  
  useEffect(() => {
    dispatch(linkedResourcesActions.getLinkedResources(id))
    return () => {
      dispatch(linkedResourcesActions.resetLinkedResourcesList())
    }
  }, [id])

  if (!container) {
    return <Loader fillParent />
  }

  return (
    <>
      <Page>
        <Card>
          <CardHeader flex>
            {container.name}
            <Button onClick={onEdit}>Edit</Button>
          </CardHeader>
          <CardBody>
            {error && <Alert type={TYPES.DANGER}>{error.message}</Alert>}
            <SanitizeHtml>{container.description || ''}</SanitizeHtml>
          </CardBody>
        </Card>

        {/* Pages */}
        <Card>
          <CardHeader flex>
            List
            <Button onClick={onAddClick}>Add</Button>
          </CardHeader>
          <CardBody>
            {listLoading && <Loader fillParent />}

            <List>
              {list.map((item) => (
                <ListItem key={item.id} onClick={() => onItemClick(item)}>
                  {item.name}
                  <Button kind={BTN_KIND.DANGER} onClick={stopPropagation(() => setItemToDelete(item))}>
                    <i className="fas fa-trash-alt" />
                  </Button>
                </ListItem>
              ))}
            </List>
          </CardBody>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader flex>
            Resources
            <Button onClick={onAddResource}>Add</Button>
          </CardHeader>
          <CardBody>
            {/* TODO */}
            {/* {listLoading && <Loader fillParent />} */}

            <List>
              {linkedResourcesList.map((item) => (
                <ListItem key={item.id} onClick={() => onResourceClick(item)}>
                  {resources[item.resourceId].name}
                  <Button kind={BTN_KIND.DANGER} onClick={stopPropagation(() => setResourceToDelete(item))}>
                    <i className="fas fa-trash-alt" />
                  </Button>
                </ListItem>
              ))}
            </List>
          </CardBody>
        </Card>
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
                removeScenario(deleteItem.id)
              }}
            >
              Yes
            </Button>
          </ModalControls>
        </Modal>
      )}
    </>
  )
}
