import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
} from '../card';
import { SmallButton } from '../button';
import {
  List,
  ListItem,
} from '../list';
import Page from '../page';
import styles from './styles.css';

const PageList = (props) => {
  const {
    title,
    onAddClick,
    list,
    renderItem,
    onItemClick,
  } = props;

  return (
    <Page>
      <Card>
        <CardHeader>
          <div className={styles.listHeader}>
            {title}

            <div className={styles.controls}>
              <SmallButton onClick={onAddClick}>Add</SmallButton>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <List>
            {list.map(item => (
              <ListItem
                className={styles.listItem}
                key={item.id || item.key}
                onClick={onItemClick}
              >
                {renderItem(item)}
              </ListItem>
            ))}
          </List>
        </CardBody>
      </Card>
    </Page>
  );
};
PageList.propTypes = {
  title: PropTypes.string,
  onAddClick: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.array,
  renderItem: PropTypes.func,
  onItemClick: PropTypes.func,
};
PageList.defaultProps = {
  title: '',
  onAddClick: () => {},
  list: [],
  renderItem: () => {},
  onItemClick: () => {},
};

export default PageList;
