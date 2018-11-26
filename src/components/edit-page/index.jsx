import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from '../page';
import * as campaignsAction from '../../actions/campaigns';
import {
  Card,
  CardHeader,
  CardBody,
} from '../card';
import {
  Button,
  KIND,
} from '../button';
import {
  InputWithLabel,
  TextAriaWithLabel,
} from '../forms';
import styles from './styles.css';

export const TYPES = {
  INPUT: 'INPUT',
  TEXTAREA: 'TEXTAREA',
};

const getInputByType = (data) => {
  switch (data.type) {
    case TYPES.INPUT:
      return (
        <InputWithLabel
          label={data.label}
          id={data.key}
          key={data.key}
          value={data.value}
          onChange={e => data.onChange(e.target.value)}
          fullWidth
        />
      );

    case TYPES.TEXTAREA:
      return (
        <TextAriaWithLabel
          label={data.label}
          id={data.key}
          key={data.key}
          value={data.value}
          onChange={e => data.onChange(e.target.value)}
          fullWidth
        />
      );

    default:
      return null;
  }
};

const getData = inputs => inputs.reduce((acc, input) => ({
  ...acc,
  [input.key]: input.value,
}), {});

const EditPage = (props) => {
  const {
    title,
    onCancelClick,
    onSaveClick,
    inputs,
  } = props;

  const inputsWithState = inputs.map((input) => {
    const [value, onChange] = useState(input.value);
    return {
      ...input,
      value,
      onChange,
    };
  });

  return (
    <Page>
      <Card>
        <CardHeader flex>
          {title}
          <div className={styles.controls}>
            <Button
              onClick={onCancelClick}
              kind={KIND.DANGER}
            >
              Cancel
            </Button>
            <Button onClick={() => onSaveClick(getData(inputsWithState))}>
              Save
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          {inputsWithState.map(input => getInputByType(input))}
        </CardBody>
      </Card>
    </Page>
  );
};

EditPage.propTypes = {
  title: PropTypes.string.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    key: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};
EditPage.defaultProps = {
};

const mapStateToProps = ({ campaigns }) => ({
  campaign: campaigns.currentCampaign,
});

const mapDispatchToProps = {
  getCampaigns: campaignsAction.getCampaigns,
  getCampaign: campaignsAction.fetchCampaign,
  saveCampaign: campaignsAction.saveCampaign,
  resetCampaign: campaignsAction.resetCampaign,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPage);
