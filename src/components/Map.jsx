import React, { useState, useCallback, useRef } from 'react'; 
import { useSelector } from 'react-redux';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import MapSearch from './MapSearch.jsx';
import MapGeolocation from './MapGeolocation.jsx';
import MapCard from './MapCard.jsx';





const libraries = ['places'];

const mapContainerStyle = {
  // width: '100vw',
  width: '100%',
  height: '135vh',
};

// hardcoding where center of map is, need to go back and get this from geolocation
const center = {
  lat: 33.684566,
  lng: -117.826508,
};

// styling for map, only allowing zoomControl @10:45
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {

  // getting coordinates from userData to put markers on map
  const coors = useSelector(state => state.userCard);


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  // array to iterate through based on user interaction with map, if markers are to be placed
  // const [markers, setMarkers] = useState([]);

  // get location when click on marker
  const [selected, setSelected] = useState(null);


  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []); 

  const panTo = useCallback(({lat,lng}) => {
    // pan to that marker
    mapRef.current.panTo({lat, lng});
    // and want map to zoom to hat location
    mapRef.current.setZoom(10);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';


  const img=["https://source.unsplash.com/user/erondu", "https://source.unsplash.com/user/john_vicente26", "https://source.unsplash.com/user/timbog80","https://source.unsplash.com/random",
  "https://source.unsplash.com/user/priscilladupreez", "https://source.unsplash.com/user/chrisjoelcampbell", "https://source.unsplash.com/user/timbog80","https://source.unsplash.com/user/brucemars","https://source.unsplash.com/user/armedshutter"]


  return (
    <div>
      {/* <MapSearch panTo={panTo}/> */}
      <MapGeolocation panTo={panTo} />


      <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      zoom={8}
      center={center}
      options={options}
      // onClick={handleMarker}
      onLoad={onMapLoad}
      >
        {coors.map((coordinates,i) => 
        <Marker 
          key={i}
          position={{ lat: coordinates.lat, lng: coordinates.lng }}
          onClick={() => {
            // when user picks a specific pin, a pop up will appear with some info and chance to open up their specific card
            setSelected(coordinates);
          }}
        />)}
      
      {selected ? (
      <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => {setSelected(null)}}>
        <MapCard selected={selected} img={img}/>
      </InfoWindow>) : null}
      </GoogleMap>
    </div>
  )
}

