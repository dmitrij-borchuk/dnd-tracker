import * as React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import RichText from '../../components/richText'
import * as commonActions from '../../actions/common'
import { fetchContainer, resetCurrentContainer, saveContainer } from '../../actions/containers'
import { ROUTES } from '../../constants'
import Page from '../../components/page'
import { Card, CardHeader, CardBody } from '../../components/card'
import { Button, KIND } from '../../components/button'
import { InputWithLabel } from '../../components/forms'
import Label from '../../components/label'
import { ICampaign, IStore } from '../../interfaces'

const selector = ({ containers }: IStore) => ({
  container: containers.current,
  redirect: commonActions.redirect,
})

interface IContainerEditPageProps {
  saveCampaign: (campaign: ICampaign) => void
  getCampaign: (id: string) => void
  resetCampaign: () => void
  campaign: ICampaign | null
  redirect: (path: string) => void
  isCreate?: boolean
}
export const ContainerEdit: React.FC<IContainerEditPageProps> = (props) => {
  const { isCreate = false } = props
  // 'id' is a parent id if 'isCreate === true'
  const { id } = useParams<{ id: string }>()
  const { container, redirect } = useSelector(selector)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const onCancel = React.useCallback(() => {
    dispatch(redirect(`${ROUTES.HOME}${id || ''}`))
  }, [id])
  const onSave = React.useCallback(() => {
    dispatch(
      saveContainer({
        ...container,
        name,
        description,
        parentId: id || 'root',
      }),
    )
  }, [container, name, description, isCreate])

  useEffect(() => {
    if (id && !isCreate) {
      dispatch(fetchContainer(id))
    }
    return () => {
      dispatch(resetCurrentContainer())
    }
  }, [id, isCreate])
  useEffect(() => {
    if (container) {
      setName(container.name)
      setDescription(container.description)
    } else {
      setName('')
      setDescription('')
    }
  }, [container])

  return (
    <Page>
      <Card>
        <CardHeader flex>
          {isCreate ? 'Create' : 'Edit'}
          <div>
            <Button onClick={onCancel} kind={KIND.DANGER}>
              Cancel
            </Button>
            <Button onClick={onSave}>Save</Button>
          </div>
        </CardHeader>
        <CardBody>
          <InputWithLabel
            label="Name"
            id="name"
            key="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <Label>Description</Label>
          <RichText value={description} onChange={setDescription} />
        </CardBody>
      </Card>
    </Page>
  )
}
