/* eslint-disable jsx-a11y/label-has-associated-control */
import { string, bool, func } from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  margin-top: 1em;
`;

const DescriptionLabel = styled.span`
  padding-left: 1em;
`;

export default function Checkbox({
  label, required, name, onChange,
}) {
  const handleChange = (e) => {
    onChange({
      name,
      value: e.target.checked,
      valid: required ? e.target.checked : true,
    });
  };

  return (
    <Container>
      <label htmlFor={name}>
        <input type="checkbox" id={name} name={name} onChange={handleChange} />
        <DescriptionLabel>{label}</DescriptionLabel>
      </label>
    </Container>
  );
}

Checkbox.propTypes = {
  label: string,
  required: bool,
  onChange: func,
  name: string,
};

Checkbox.defaultProps = {
  label: 'checkbox',
  required: false,
  onChange: () => { console.log('on change checkbox'); },
  name: 'checkbox',
};
