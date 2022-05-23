/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import {
  string, bool, instanceOf, func,
} from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  .filled {
    transform: translate(0, 12px) scale(0.8);
  }
  & > select {
    height: 53px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    border: none;
    border-bottom: 1px solid black;
    padding: 24px 16px 4px 12px;
    font-size: 16px;
    line-height: 1;
    outline: none;
    box-shadow: none;
    transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    background-color: #ededed;
  }
  & > label {
    position: absolute;
    pointer-events: none;
    transform: translate(0, 20px) scale(1);
    transform-origin: top left;
    transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    color: #8b8b8b;
    font-size: 16px;
    line-height: 1;
    left: 16px;
  }
  &:focus-within > label {
    transform: translate(0, 12px) scale(0.8);
    color: ${({ theme }) => theme.colors.primary};
  }
  &:focus-within > select {
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
  &:focus {
    box-shadow: 0 0 0 2px #79b1ff;
  }
`;

export default function Select({
  values, label, required, name, onChange,
}) {
  const defaultValue = values && values.length ? values[0].value : '';
  const defaultLabel = values && values.length ? values[0].label : '';
  const [ value, setValue ] = useState(defaultValue);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange({
      name,
      value: e.target.value,
      valid: true,
      label: values.filter((item) => item.value === e.target.value)[0].label,
    });
  };

  useEffect(() => {
    onChange({
      name,
      value: defaultValue,
      label: defaultLabel,
      valid: true,
    });
  }, []);

  return (
    <Container>
      <select name="select" id={label} required={required} onChange={handleChange}>
        {values && values.length && values.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>
      <label className={value && 'filled'} htmlFor={label}>{label}</label>
    </Container>
  );
}

Select.propTypes = {
  values: instanceOf(Array),
  label: string,
  required: bool,
  onChange: func,
  name: string,
};

Select.defaultProps = {
  values: [],
  label: 'select',
  required: false,
  onChange: () => { console.log('on change select input'); },
  name: 'select',
};
