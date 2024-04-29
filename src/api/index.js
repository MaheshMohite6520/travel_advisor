/* eslint-disable consistent-return */
import axios from 'axios'

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data }
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat
        },
        headers: {
          'x-rapidapi-key':
            'b98e60e025msha4d33f7c031168ap149692jsn0ebde160ae30',
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
        }
      }
    )

    return data
  } catch (error) {
    console.log(error)
  }
}

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const WEATHER_API_URL = 'http://api.weatherapi.com/v1'

const weatherApi = axios.create({
  baseURL: WEATHER_API_URL,
  params: {
    key: WEATHER_API_KEY
  }
})

export const fetchWeather = async city => {
  try {
    const { data } = await weatherApi.get('/current.json', {
      params: { q: city }
    })
    return data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return null
  }
}
