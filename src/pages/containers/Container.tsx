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

const selector = ({ containers }: IStore) => ({
  error: containers.error,
  list: containers.list,
  listLoading: containers.listLoading,
  container: containers.current,
  redirect: commonActions.redirect,
})

interface IContainerProps {
  match: {
    params: {
      id: string
    }
  }
}
export const Container: React.FC<IContainerProps> = (props) => {
  const { error, listLoading, list, container } = useSelector(selector)
  const dispatch = useDispatch()
  const { id } = useParams()

  const [
    getCampaign,
    resetCampaign,
    removeScenario,
    getScenarios,
    resetScenarioList,
    redirect,
  ] = mapDispatchToActions(dispatch, [
    campaignsAction.fetchCampaign,
    campaignsAction.resetCampaign,
    scenariosAction.removeScenario,
    scenariosAction.getScenarios,
    scenariosAction.resetScenarioList,
    commonActions.redirect,
  ])
  const [deleteItem, setItemToDelete] = useState<IContainer | null>(null)
  const onEdit = React.useCallback(() => {
    dispatch(commonActions.redirect(`${ROUTES.CONTAINER_EDIT}/${id}`))
  }, [id])
  const onAddClick = React.useCallback(() => {
    dispatch(commonActions.redirect(`${ROUTES.CONTAINER_CREATE}/${id}`))
  }, [id])

  useEffect(() => {
    dispatch(fetchContainer(id))
    dispatch(fetchContainers(id))
    return () => {
      dispatch(resetContainersStore())
    }
  }, [])

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

        <Card>
          <CardHeader flex>
            List
            <Button onClick={onAddClick}>Add</Button>
          </CardHeader>
          <CardBody>
            {listLoading && <Loader fillParent />}

            {/* Scenarios */}
            <List>
              {list.map((item) => (
                <ListItem key={item.id} onClick={() => redirect(`${ROUTES.SCENARIOS}/${item.id}`)}>
                  {item.name}
                  <Button kind={BTN_KIND.DANGER} onClick={stopPropagation(() => setItemToDelete(item))}>
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
