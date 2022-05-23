/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { string, bool, func } from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  .filled {
    transform: translate(0, 12px) scale(0.8);
  }
  & > input {
    height: 24px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    border: none;
    border-bottom: 1px solid black;
    padding: 24px 16px 4px 16px;
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
  &:focus-within > input {
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
  &:focus {
    box-shadow: 0 0 0 2px #79b1ff;
  }
`;

export default function InputText({
  type, label, name, required, onChange,
}) {
  const [ value, setValue ] = useState('');

  const handleChange = (e) => {
    const { value: newValue } = e.target;
    setValue(newValue);
    onChange({
      name,
      value: newValue,
      valid: e.target?.validity?.valid,
    });
  };

  return (
    <Container>
      <input required={required} type={type} value={value} onChange={handleChange} id={label} />
      <label className={value && 'filled'} htmlFor={label}>{label}</label>
    </Container>
  );
}

InputText.propTypes = {
  type: string,
  label: string,
  name: string,
  required: bool,
  onChange: func,
};

InputText.defaultProps = {
  type: 'text',
  label: 'Input Text',
  name: 'inputText',
  required: false,
  onChange: () => { console.log('on change text input'); },
};
