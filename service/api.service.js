import https from 'https'
import { getKeyValue, tokenDictionar } from './storage.service.js'
import axios from 'axios'

const getWeather = async (city) => {
  const token = process.env.TOKEN ?? (await getKeyValue(tokenDictionar.token))
  if (!token) {
    throw new Error(
      'Incorrect API key. You can set it with the command -t [API_KEY]'
    )
  }
  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: token,
        lang: 'en',
        units: 'metric',
      },
    }
  )
  return data
}

export { getWeather }
