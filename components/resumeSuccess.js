import { string, shape, number } from 'prop-types';
import styled from 'styled-components';

import { CheckCircle } from '@styled-icons/feather';
import { useProfile } from '../context/profileContext';

const StyledResume = styled.section`
  font-size: 0.9em;
  margin-top: 1em;
  box-shadow: 1px 1px 5px #727272;
`;

const IdContainer = styled.div`
  text-align: center;
  padding-top: 2em;
  padding-bottom: 1em;
  & > svg {
    stroke: ${({ theme }) => theme.colors.primary}
  }
`;

const RoomName = styled.h3`
  vertical-align: middle;
  margin: 0px;
  margin-bottom: 0.5em;
`;

const Content = styled.div`
  padding: 10px;
  border-top: 1px solid #f6f6f6;
`;

const BoardDiv = styled.div`
  align-self: center;
  & > p {
    margin-top: 0px;
    margin-bottom: 0.5em;
  }
`;

const TotalPrice = styled.div`
  text-align: end;
`;

export default function ResumeSuccess({
  roomName, date, board, userData,
}) {
  const { profileData } = useProfile();
  return (
    <StyledResume>
      <IdContainer>
        <CheckCircle size={80} />
        <h4>Reserva Y8839932</h4>
      </IdContainer>
      <Content>
        <RoomName>{roomName}</RoomName>
        <BoardDiv>
          <p>{date}</p>
          <strong>{board.name}</strong>
        </BoardDiv>
      </Content>
      <Content>
        <TotalPrice>
          <strong>{`TOTAL: ${profileData?.currencyLabel} ${board.price}`}</strong>
        </TotalPrice>
      </Content>
      <Content>
        <RoomName>{`${userData.name} ${userData.surname}`}</RoomName>
        <BoardDiv>
          <p>{userData.mail}</p>
          <strong>{userData.country}</strong>
        </BoardDiv>
      </Content>
    </StyledResume>
  );
}

ResumeSuccess.propTypes = {
  roomName: string,
  date: string,
  board: shape({
    price: number,
    name: string,
  }),
  userData: shape({
    name: string,
    surname: string,
    mail: string,
    country: string,
  }),
};

ResumeSuccess.defaultProps = {
  roomName: '',
  date: '',
  board: {},
  userData: {},
};
