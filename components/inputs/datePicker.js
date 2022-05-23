import { string } from 'prop-types';
import styled from 'styled-components';
import { Calendar } from '@styled-icons/feather';

const StyledDatePicker = styled.div`
  border-bottom: solid 1px;
  padding-bottom: .2em;
  margin-bottom: 1em;
  font-size: .9em;
`;

const DateSpan = styled.span`
  vertical-align: middle;
  padding: 0px 0px 0px 10px;
  font-size: 0.85em;
`;

export default function DatePicker({ defaultValue }) {
  return (
    <StyledDatePicker>
      <Calendar size={20} />
      <DateSpan>
        {defaultValue}
      </DateSpan>
    </StyledDatePicker>
  );
}

DatePicker.propTypes = {
  defaultValue: string,
};

DatePicker.defaultProps = {
  defaultValue: '21/05/2022',
};
