import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem } from '../../components/list';
import { IStore } from '../../interfaces';
import * as resourcesAction from '../../actions/resources';
import { IResource } from '../../interfaces/resource';
import Loader from '../loader';

const listSelector = ({ resources }: IStore) => resources.list
const loadingSelector = ({ resources }: IStore) => resources.loading

interface IResourceSelectorProps {
  onSelect?: (res: IResource) => void
}
export const ResourceSelector = (props: IResourceSelectorProps) => {
  const {
    onSelect = () => {},
  } = props;
  const list = useSelector(listSelector)
  const loading = useSelector(loadingSelector)
  const keys = Object.keys(list)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resourcesAction.getResources())
  }, [])

  if (loading) {
    return (
      <div className="center">
        <Loader />
      </div>
    )
  }

  return (
    <List>
      {keys.map(key => (
        <ListItem key={key} onClick={() => onSelect(list[key])}>{list[key].name}</ListItem>
      ))}
    </List>
  );
};
