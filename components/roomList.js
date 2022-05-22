import { string, instanceOf, func } from 'prop-types';
import styled from 'styled-components';
import { currency } from '../utils/constants';

const StyledRoomList = styled.section`
  font-size: 0.9em;
  margin-top: 1em;
  box-shadow: 1px 1px 5px #727272;
`;

const StyledUl = styled.ul`
  list-style-type: none;
  padding-inline-start: 0px;
  margin-block-start: 0px;
`;

const ListHeader = styled.h3`
  vertical-align: middle;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  margin: 0px;
  padding: 10px;
  font-weight: normal;
`;

const BoardItem = styled.li`
  text-transform: capitalize;
  display: flex;
  padding: 1.5em 10px;
  border-bottom: 1px solid #f6f6f6;
`;

const NameSpan = styled.span`
  flex: 2;
  line-height: 25px;
`;

const PriceSpan = styled.span`
  flex: 1;
  line-height: 25px;
  color: ${({ theme }) => theme.colors.primary};
`;

const BookingButton = styled.button`
  flex: 0;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  border-radius: 4px;
  color: white;
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 5px 10px;
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.19), 0 6px 13px 0 rgba(0, 0, 0, 0.24);
  &:active {
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.23), 3px 8px 20px 0 rgba(0, 0, 0, 0.18), -3px 8px 20px 0 rgba(0, 0, 0, 0.18);
  }
`;

export default function RoomList({ header, list, onButtonClick }) {
  return (
    <StyledRoomList>
      {header && <ListHeader>{header}</ListHeader>}
      <StyledUl>
        {list && list.map((board) => (
          <BoardItem key={board.name}>
            <NameSpan>{board.name}</NameSpan>
            <PriceSpan>{`${currency} ${board.price}`}</PriceSpan>
            <BookingButton type="button" onClick={() => onButtonClick({ roomName: header, board })}>reservar</BookingButton>
          </BoardItem>
        ))}
      </StyledUl>
    </StyledRoomList>
  );
}

RoomList.propTypes = {
  header: string,
  list: instanceOf(Array),
  onButtonClick: func,
};

RoomList.defaultProps = {
  header: null,
  list: [],
  onButtonClick: () => true,
};
