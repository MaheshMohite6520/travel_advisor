import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
import mapStyles from './mapStyles'

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width: 600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyB76pi8Wz-LyK7ZbrSrBOewjX-hKzVRjig' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI : true, zoomControl: true , styles: mapStyles }}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}

                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                   <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                   >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : (
                                <Paper elevation={3} className={classes.paper} >
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom >
                                        {place.name}
                                    </Typography>
                                    <img 
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://tse2.mm.bing.net/th?id=OIP.fKfpCheBGRQ9QPiWyvg38gHaE8&pid=Api&P=0&h=180'}
                                        alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                   </div> 
                ))}

                {weatherData?.list?.length && weatherData.list.map((data, i) => (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
                    </div>
                ))}

            </GoogleMapReact>
            
        </div>
    );
}

export default Map;