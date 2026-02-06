import CountryDetails from './CountryDetails'

const Countries = ({ filter, countries, onShow }) => {
  const normalized = filter.trim().toLowerCase()

  if (normalized.length === 0) return null

  const filtered = countries.filter((c) =>
    c.name.common.toLowerCase().includes(normalized)
  )

  if (filtered.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (filtered.length === 1) {
    return <CountryDetails country={filtered[0]} />
  }

  return (
    <div>
      {filtered.map((c) => (
        <div key={c.cca3}>
          {c.name.common}{' '}
          <button onClick={() => onShow(c.name.common)}>show</button>
        </div>
      ))}
    </div>
  )
}

export default Countries