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

const Form = (props) => {
  const {
    title,
    onCancelClick,
    onChange,
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

  return inputsWithState.map(input => getInputByType(input));
};

Form.propTypes = {
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
Form.defaultProps = {
};

export default Form;
