import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector, useDispatch } from 'react-redux'
import * as campaignsAction from '../../actions/campaigns'
import * as commonActions from '../../actions/common'
import { fetchContainers } from '../../actions/containers'
import { ROUTES } from '../../constants'
import { stopPropagation } from '../../utils'
import { Card, CardHeader, CardBody } from '../../components/card'
import { Modal, ModalHeader, ModalBody, ModalControls } from '../../components/modal'
import { Button, KIND as BTN_KIND } from '../../components/button'
import { List, ListItem } from '../../components/list'
import Page from '../../components/page'
import Alert, { TYPES } from '../../components/alert'
import Loader from '../../components/loader'
import { IStore } from '../../interfaces'
import { IContainer } from '../../interfaces/container'

const selector = ({ containers }: IStore) => ({
  list: containers.list,
  error: containers.error,
  loading: containers.listLoading,
})

interface IContainersListProps {
  removeItem: (id: string) => void
}
export const ContainersList = (props: IContainersListProps) => {
  const { removeItem } = props
  const [deleteItem, setItemToDelete] = useState<IContainer | null>(null)
  const { list, error, loading } = useSelector(selector)
  const dispatch = useDispatch()
  const redirect = useCallback((path: string) => {
    dispatch(commonActions.redirect(path))
  }, [])

  useEffect(() => {
    dispatch(fetchContainers())
  }, [])

  return (
    <>
      <Page>
        <Card>
          <CardHeader flex>
            <div></div>
            <Button onClick={() => redirect(ROUTES.CONTAINER_CREATE)}>Add</Button>
          </CardHeader>
          <CardBody>
            {error && <Alert type={TYPES.DANGER}>{error.message}</Alert>}
            {loading && <Loader fillParent />}
            <List>
              {list.map((item) => (
                <ListItem key={item.id} onClick={() => redirect(`/${item.id}`)}>
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
                removeItem(deleteItem.id)
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

// ContainersList.propTypes = {
//   getList: PropTypes.func.isRequired,
//   redirect: PropTypes.func.isRequired,
//   removeCampaign: PropTypes.func.isRequired,
//   scenario: PropTypes.shape({
//     name: PropTypes.string,
//     description: PropTypes.string,
//   }),
//   list: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string,
//     }),
//   ).isRequired,
//   error: PropTypes.instanceOf(Error),
//   loading: PropTypes.bool,
// }
// ContainersList.defaultProps = {
//   scenario: null,
//   error: null,
//   loading: false,
// }

// const mapStateToProps = ({ campaigns }) => ({
//   list: campaigns.list,
//   error: campaigns.error,
//   loading: campaigns.loading,
// })

// const mapDispatchToProps = {
//   getList: campaignsAction.getCampaigns,
//   removeCampaign: campaignsAction.removeCampaign,
//   redirect: commonActions.redirect,
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ContainersList)
