import { defaultCoords } from '@/constants/map';
import { storage } from '@/lib/storage';
import { useEffect, useState } from 'react';

function useGeolocation() {
  const [myLocation, setMyLocation] = useState(() => {
    // localStorage에서 저장된 위치가 있는지 확인
    const savedLocation = storage.get('userLocation');
    if (savedLocation) {
      return JSON.parse(savedLocation);
    }
    return {
      latitude: defaultCoords.lat,
      longitude: defaultCoords.lng,
    };
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by this browser.');
      return;
    }

    // 위치 정확도를 높이기 위한 옵션 추가
    const options = {
      enableHighAccuracy: true, // 높은 정확도 모드 활성화
      maximumAge: 30000, // 30초 이내의 캐시된 위치만 사용
      timeout: 27000, // 27초 이내에 응답이 없으면 타임아웃
    };

    // 지속적인 위치 업데이트를 위한 watch 함수
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy, // 정확도 정보 추가
          timestamp: position.timestamp, // 타임스탬프 추가
        };

        // 정확도가 100m 이내일 때만 위치 업데이트
        if (position.coords.accuracy <= 100) {
          setMyLocation(newLocation);
          storage.set('userLocation', JSON.stringify(newLocation));
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            console.error('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            console.error('The request to get user location timed out.');
            break;
        }
      },
      options,
    );

    // 컴포넌트 언마운트 시 위치 감시 중지
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
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
