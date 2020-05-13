import * as React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardHeader, CardBody } from '../../components/card'
import { Button, KIND as BTN_KIND } from '../../components/button'
import { List, ListItem } from '../../components/list'
import Page from '../../components/page'
// import * as styles from './styles.css';
import { IStore } from '../../interfaces'
import * as linkedResourcesActions from '../../actions/linkedResources'

const resourcesSelector = ({ resources }: IStore) => resources.list
interface ILinkedResourcesListProps {
  objectId: string
}
export const LinkedResourcesList = (props: ILinkedResourcesListProps) => {
  const { objectId } = props
  const resources = useSelector(resourcesSelector)
  const dispatch = useDispatch()
  const linkedKeys = Object.keys(resources)
  // const [deleteItem, setItemToDelete] = useState<IScene | null>(null);

  useEffect(() => {
    dispatch(linkedResourcesActions.getLinkedResources(objectId))
    return () => {
      dispatch(linkedResourcesActions.resetLinkedResourcesList())
    }
  }, [])

  return (
    <>
      <Card>
        <CardHeader flex>Resources</CardHeader>
        <CardBody>
          <List>
            {linkedKeys.map((key) => (
              <ListItem
                key={key}
                // onClick={() => redirect(`${ROUTES.SCENES}/${item.id}`)}
              >
                {resources[key].name}
                <span>
                  <Button
                    kind={BTN_KIND.DANGER}
                    // onClick={stopPropagation(() => setItemToDelete(item))}
                  >
                    <i className="fas fa-trash-alt" />
                  </Button>
                </span>
              </ListItem>
            ))}
          </List>
        </CardBody>
      </Card>

      {/* {deleteItem && (
        <Modal>
          <ModalHeader>{deleteItem.name}</ModalHeader>
          <ModalBody>Do you really want to delete this?</ModalBody>
          <ModalControls>
            <Button onClick={() => setItemToDelete(null)}>No</Button>
            <Button
              kind={BTN_KIND.DANGER}
              onClick={() => {
                setItemToDelete(null);
                removeScene(deleteItem.id);
              }}
            >
              Yes
            </Button>
          </ModalControls>
        </Modal>
      )} */}
    </>
  )
}
