import Weather from './Weather'

const CountryDetails = ({ country }) => {
  const capital = country.capital?.[0] ?? '—'
  const [lat, lon] = country.capitalInfo?.latlng ?? []
  const languages = country.languages ? Object.values(country.languages) : []

  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>capital {capital}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`flag of ${country.name.common}`}
        width="160"
      />

      {capital !== '—' && <Weather capital={capital} lat={lat} lon={lon} />}
    </div>
  )
}

export default CountryDetails