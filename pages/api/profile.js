export default function handler(req, res) {
  res.status(200).json({
    dateFormat: 'DD/MM/YYYY',
    currencyLabel: '€',
    currentCountry: 'ES',
    countries: [
      { value: 'ES', label: 'España' },
      { value: 'FR', label: 'Francia' },
      { value: 'DE', label: 'Alemania' },
      { value: 'IT', label: 'Italia' },
    ],
  });
}
