export default function handler(req, res) {
  res.status(200).json({
    dates: {
      checkin: '2022/05/22',
      checkout: '2022/05/28',
    },
    rooms: [
      {
        name: 'Doble Vista Piscina',
        boards: [
          {
            price: 352,
            name: 'solo alojamiento',
          },
          {
            price: 563,
            name: 'habitación y desayuno',
          },
          {
            price: 655,
            name: 'todo incluído',
          },
        ],
      },
      {
        name: 'Doble Vista Mar',
        boards: [
          {
            price: 366,
            name: 'solo alojamiento',
          },
          {
            price: 580,
            name: 'habitación y desayuno',
          },
          {
            price: 675,
            name: 'todo incluído',
          },
        ],
      },
    ],
  });
}
