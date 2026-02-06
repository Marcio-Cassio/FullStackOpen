import axios from 'axios'
import { useEffect, useState } from 'react'
import Countries from './components/Countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>
        find countries{' '}
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <Countries
        filter={filter}
        countries={countries}
        onShow={(name) => setFilter(name)}
      />
    </div>
  )
}

export default App