import { useState } from 'react';
import { instanceOf, string, shape } from 'prop-types';

import { availability } from '../utils/apiRoutes';
import DatePicker from '../components/datePicker';
import RoomList from '../components/roomList';
import RoomResume from '../components/roomResume';

export default function Home({ availabilityData }) {
  const [ selectedRoom, setSelectedRoom ] = useState(null);

  const dateRange = `${availabilityData?.dates?.checkin} - ${availabilityData?.dates?.checkout}`;
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
      <p>Resumen de tu reserva</p>
      <RoomResume
        date={dateRange}
        roomName={selectedRoom.roomName}
        board={selectedRoom.board}
      />
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
  const res = await fetch(availability);
  const availabilityData = await res.json();
  return {
    props: {
      availabilityData,
    },
  };
}
