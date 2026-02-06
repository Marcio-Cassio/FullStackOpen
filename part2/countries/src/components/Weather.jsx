import axios from 'axios'
import { useEffect, useState } from 'react'

const Weather = ({ capital, lat, lon }) => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_KEY

    if (!apiKey || lat == null || lon == null) return

    setWeather(null)
    setError(null)

    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat,
          lon,
          appid: apiKey,
          units: 'metric',
        },
      })
      .then((response) => setWeather(response.data))
      .catch((err) => {
        const msg = err.response?.data?.message || err.message
        setError(msg)
      })
  }, [lat, lon])

  if (lat == null || lon == null) return null
  if (error) return <div>Weather error: {error}</div>
  if (!weather) return <div>Loading weather...</div>

  const icon = weather.weather?.[0]?.icon
  const desc = weather.weather?.[0]?.description ?? 'weather'

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div>temperature {weather.main.temp} °C</div>

      {icon && (
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={desc}
        />
      )}

      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather