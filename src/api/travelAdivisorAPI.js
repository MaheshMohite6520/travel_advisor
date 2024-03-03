import axios from "axios"; 

export const getPlacesData = async (type, sw, ne) =>  {
    try {
        const { data : { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng ,
              tr_longitude: ne.lng
            },
            headers: {  
              'X-RapidAPI-Key': 'b98e60e025msha4d33f7c031168ap149692jsn0ebde160ae30',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          });

        return data;
    } catch(error) {
        console.log(error);
    }

}

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://open-weather13.p.rapidapi.com/city/latlon/30.438/-89.1028', {
        params: { lat: lat, lon: lng },
        headers: {
          'X-RapidAPI-Key': 'b98e60e025msha4d33f7c031168ap149692jsn0ebde160ae30',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        },
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};