import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from '../card';
import CollapsibleBlock from './collapsibleBlock';
import styles from './styles.css';

const Accordion = (props) => {
  const {
    children,
    title,
  } = props;
  const [opened, setOpened] = useState(true);

  useEffect(() => {
    setOpened(false);
  }, []);

  return (
    <Card>
      <span onClick={() => setOpened(!opened)}>
        <CardHeader className={styles.title}>
          {title}
        </CardHeader>
      </span>
      <CollapsibleBlock isOpened={opened}>
        <CardBody>
          {children}
        </CardBody>
      </CollapsibleBlock>
    </Card>
  );
};
Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
Accordion.defaultProps = {
};

export default Accordion;
