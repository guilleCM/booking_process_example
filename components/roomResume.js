import { string, shape, number } from 'prop-types';
import styled from 'styled-components';
import { useProfile } from '../context/profileContext';

const StyledRoomResume = styled.section`
  font-size: 0.9em;
  margin-top: 1em;
  box-shadow: 1px 1px 5px #727272;
`;

const RoomName = styled.h3`
  vertical-align: middle;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  margin: 0px;
  padding: 10px;
  font-weight: normal;
`;

const Content = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  & > div:last-child {
    align-self: center;
  }
`;

const BoardDiv = styled.div`
  align-self: center;
  & > p {
    margin-top: 0px;
    margin-bottom: 0.5em;
  }
`;

export default function RoomResume({ roomName, date, board }) {
  const { profileData } = useProfile();
  return (
    <StyledRoomResume>
      <RoomName>{roomName}</RoomName>
      <Content>
        <BoardDiv>
          <p>{date}</p>
          <strong>{board.name}</strong>
        </BoardDiv>
        <div>
          <strong>{`${profileData?.currencyLabel} ${board.price}`}</strong>
        </div>
      </Content>
    </StyledRoomResume>
  );
}

RoomResume.propTypes = {
  roomName: string,
  date: string,
  board: shape({
    price: number,
    name: string,
  }),
};

RoomResume.defaultProps = {
  roomName: '',
  date: '',
  board: {},
};
