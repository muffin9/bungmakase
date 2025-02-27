import { defaultCoords } from '@/constants/map';
import { useEffect, useState } from 'react';

function useGeolocation() {
  const [myLocation, setMyLocation] = useState({
    latitude: defaultCoords.lat,
    longitude: defaultCoords.lng,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        },
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  return { myLocation, setMyLocation };
}

export default useGeolocation;
