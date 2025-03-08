import { defaultCoords } from '@/constants/map';
import { storage } from '@/lib/storage';
import { useEffect, useState } from 'react';

function useGeolocation() {
  const [myLocation, setMyLocation] = useState(() => {
    const savedLocation = storage.get('userLocation');
    return savedLocation
      ? JSON.parse(savedLocation)
      : {
          latitude: defaultCoords.lat,
          longitude: defaultCoords.lng,
        };
  });

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by this browser.');
      return;
    }

    // 위치 정보 옵션 조정
    const options = {
      enableHighAccuracy: false, // 배터리 소모와 정확도 트레이드오프
      maximumAge: 300000, // 5분 이내의 캐시된 위치 허용
      timeout: 10000, // 10초 타임아웃
    };

    let watchId: number;

    // 먼저 한 번 현재 위치 가져오기 시도
    const getCurrentPositionPromise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
    getCurrentPositionPromise
      .then((position) => {
        handlePositionUpdate(position as GeolocationPosition);
        // 성공적으로 위치를 가져온 후 watchPosition 시작
        startWatchingPosition();
      })
      .catch((error) => {
        console.warn('Initial position error:', error.message);
        // 초기 위치 획득 실패 시에도 watchPosition 시작
        startWatchingPosition();
      });

    function startWatchingPosition() {
      // 연속적인 위치 업데이트 시작
      watchId = navigator.geolocation.watchPosition(
        handlePositionUpdate,
        handleError,
        options,
      );
    }

    function handlePositionUpdate(position: GeolocationPosition) {
      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      };

      setIsError(false);
      setMyLocation(newLocation);
      storage.set('userLocation', JSON.stringify(newLocation));
    }

    function handleError(error: GeolocationPositionError) {
      console.warn('Geolocation error:', error.message);
      setIsError(true);

      // 저장된 마지막 위치 사용
      const savedLocation = storage.get('userLocation');
      if (savedLocation) {
        try {
          const parsed = JSON.parse(savedLocation);
          setMyLocation(parsed);
          return;
        } catch (e) {
          console.error('Error parsing saved location:', e);
        }
      }

      // 에러 메시지 표시
      let errorMessage = '';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage =
            '위치 권한이 거부되었습니다. 설정에서 위치 권한을 허용해주세요.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage =
            '위치 정보를 사용할 수 없습니다. 잠시 후 다시 시도해주세요.';
          break;
        case error.TIMEOUT:
          errorMessage = '위치 정보 요청 시간이 초과되었습니다.';
          break;
        default:
          errorMessage = '위치 정보를 가져오는 중 오류가 발생했습니다.';
      }

      // 사용자에게 알림
      if (!storage.get('userLocation')) {
        alert(errorMessage);
      }

      // 기본 위치로 폴백
      setMyLocation({
        latitude: defaultCoords.lat,
        longitude: defaultCoords.lng,
      });
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
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

  return {
    myLocation,
    setMyLocation,
    isError,
    calculateDistance: (lat: number, lng: number): number => {
      return calculateDistance(lat, lng);
    },
  };
}

export default useGeolocation;
