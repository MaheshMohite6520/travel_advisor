/* eslint-disable consistent-return */
import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-key': 'ac916480ccmsh2c128a2f36c8bdap15a738jsne1ad4bcc808a',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://weatherbit-v1-mashape.p.rapidapi.com/current', {
        params: { lat, lon: lng },
        headers: {
          'X-RapidAPI-Key': 'b98e60e025msha4d33f7c031168ap149692jsn0ebde160ae30',
          'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        },
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};