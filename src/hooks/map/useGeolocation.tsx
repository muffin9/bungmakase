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

  const calculateDistance = (lat: number, lng: number): number => {
    const R = 6371; // 지구의 반경 (km)

    // 위도, 경도를 라디안으로 변환
    const lat1 = myLocation.latitude * (Math.PI / 180);
    const lat2 = lat * (Math.PI / 180);
    const lon1 = myLocation.longitude * (Math.PI / 180);
    const lon2 = lng * (Math.PI / 180);

    // 위도, 경도의 차이
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    // Haversine 공식
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // 최종 거리 (km)
    const distance = R * c;

    // 소수점 첫째 자리까지 반올림
    return Math.round(distance * 10) / 10;
  };

  return { myLocation, setMyLocation, calculateDistance };
}

export default useGeolocation;
