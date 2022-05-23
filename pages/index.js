import { useState } from 'react';
import { instanceOf, string, shape } from 'prop-types';
import styled from 'styled-components';
import { Loader } from '@styled-icons/feather';

import { availability } from '../utils/apiRoutes';
import { useProfile } from '../context/profileContext';

import DatePicker from '../components/inputs/datePicker';
import RoomList from '../components/roomList';
import RoomResume from '../components/roomResume';
import InputText from '../components/inputs/inputText';
import Select from '../components/inputs/select';
import Checkbox from '../components/inputs/checkbox';
import ResumeSuccess from '../components/resumeSuccess';

const ResumeHeader = styled.h5`
  text-transform: uppercase;
`;

const TotalPriceResume = styled.div`
  text-align: end;
  & > h5 {
    margin-bottom: 0.5em;
  }
  & > h2 {
    margin-top: 0px;
  }
`;

const FormErrorFeedback = styled.p`
  color: ${({ theme }) => theme.colors.error};
`;

const BookingButton = styled.button`
  flex: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  border-radius: 4px;
  color: white;
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 15px 15px;
  font-size: 0.7em;
  width: 100%;
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.19), 0 6px 13px 0 rgba(0, 0, 0, 0.24);
  &:active, :hover {
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.23), 3px 8px 20px 0 rgba(0, 0, 0, 0.18), -3px 8px 20px 0 rgba(0, 0, 0, 0.18);
  }
  & > svg {
    animation: rotation 2s infinite linear;
    -webkit-animation: rotation 2s infinite linear;
  }
  @keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
  }
`;

export default function Home({ availabilityData }) {
  const [ selectedRoom, setSelectedRoom ] = useState(null);
  const [ formData, setFormData ] = useState({
    name: '',
    surname: '',
    mail: '',
    country: '',
    terms: false,
  });
  const [ formValid, setFormValid ] = useState(false);
  const [ showFormFeedback, setShowFormFeedback ] = useState(false);
  const [ fetching, setFetching ] = useState(false);
  const [ showSuccessScreen, setShowSuccessScreen ] = useState(false);
  const { profileData } = useProfile();

  const handleInputChange = (statusObject) => {
    const newFormData = { ...formData };
    newFormData[[ statusObject.name ]] = statusObject;
    const validInputs = Object.keys(formData).map((inputName) => newFormData[inputName].valid || false).filter((validStatus) => validStatus === true);
    setFormData(newFormData);
    setFormValid(validInputs.length === Object.keys(formData).length);
  };

  const handleOnClickBooking = () => {
    if (!formValid) {
      setShowFormFeedback(true);
    } else {
      setFetching(true);
      /* aqui llamariamos con un post a un api para comprobar que todo esta OK y recibir el id de reserva, idealmente con ese id
      cargaria otra page pero para este ejemplo pinto el resumen de la reserva en esta misma. */
      setTimeout(() => {
        setFetching(false);
        setShowSuccessScreen(true);
      }, 1500);
    }
  };

  const dateRange = `${availabilityData?.dates?.checkin} - ${availabilityData?.dates?.checkout}`;
  if (showSuccessScreen) {
    return (
      <ResumeSuccess
        date={dateRange}
        roomName={selectedRoom.roomName}
        board={selectedRoom.board}
        userData={{
          name: formData.name.value,
          surname: formData.surname.value,
          mail: formData.mail.value,
          country: formData.country.label,
        }}
      />
    );
  }
  if (!selectedRoom) {
    return (
      <>
        <DatePicker defaultValue={dateRange} />
        {availabilityData.rooms.map((room) => (
          <RoomList
            key={room.name}
            header={room.name}
            list={room.boards}
            onButtonClick={(data) => setSelectedRoom(data)}
          />
        ))}
      </>
    );
  }
  return (
    <>
      <ResumeHeader>Resumen de tu reserva</ResumeHeader>
      <RoomResume
        date={dateRange}
        roomName={selectedRoom.roomName}
        board={selectedRoom.board}
      />
      <ResumeHeader>Tus datos</ResumeHeader>
      <InputText label="Nombre" name="name" onChange={handleInputChange} />
      <InputText label="Apellido" name="surname" onChange={handleInputChange} />
      <InputText label="Email" type="email" name="mail" onChange={handleInputChange} />
      <Select label="Pais" values={profileData?.countries || []} name="country" onChange={handleInputChange} />
      <Checkbox label="Acepto los términos y condiciones" name="terms" onChange={handleInputChange} required />
      <TotalPriceResume>
        <ResumeHeader>total</ResumeHeader>
        <h2>{`${profileData.currencyLabel} ${selectedRoom.board.price}`}</h2>
      </TotalPriceResume>
      {showFormFeedback &&
        <FormErrorFeedback>Comprueba que los todos campos son correctos y has aceptado los términos y condiciones</FormErrorFeedback>}
      <BookingButton type="button" onClick={handleOnClickBooking}>{fetching ? <Loader size={20} /> : 'reservar'}</BookingButton>
    </>
  );
}

Home.propTypes = {
  availabilityData: shape({
    dates: shape({
      checkin: string,
      checkout: string,
    }),
    rooms: instanceOf(Array),
  }),
};

Home.defaultProps = {
  availabilityData: {},
};

export async function getServerSideProps() {
  const availabilityRs = await fetch(availability);
  const availabilityData = await availabilityRs.json();
  return {
    props: {
      availabilityData,
    },
  };
}
