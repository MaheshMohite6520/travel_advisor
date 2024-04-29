import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData, fetchWeather } from './api'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

// WeatherDisplay as a named export
export const WeatherDisplay = ({ city }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeather(city)
      setWeather(data)
    }

    fetchData()
  }, [city])

  return (
    <div>
      {weather ? (
        <div>
          <h3>{weather.location.name}</h3>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  )
}

const App = () => {
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')

  const [coords, setCoords] = useState({})
  const [bounds, setBounds] = useState(null)

  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [places, setPlaces] = useState([])

  const [autocomplete, setAutocomplete] = useState(null)
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude })
      }
    )
  }, [])

  useEffect(() => {
    const filtered = places.filter(place => Number(place.rating) > rating)
    setFilteredPlaces(filtered)
  }, [rating, places])

  const onLoad = autoC => setAutocomplete(autoC)

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()

    setCoords({ lat, lng })
  }

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            // weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
