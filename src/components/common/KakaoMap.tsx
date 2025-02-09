'use client';

import { useEffect, useRef } from 'react';
import ReBoundButton from '../map/ReBoundButton';
import useGeolocation from '@/hooks/map/useGeolocation';
import { defaultCoords } from '@/constants/map';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface KakaoMapProps {
  children: React.ReactNode;
}

const KakaoMap = ({ children }: KakaoMapProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const kakaoMapRef = useRef<HTMLElement | null | any>(null);
  const location = useGeolocation();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('static_map');
        const options = {
          center: new window.kakao.maps.LatLng(
            defaultCoords.lat,
            defaultCoords.lng,
          ),
          level: 3,
        };

        kakaoMapRef.current = new window.kakao.maps.Map(container, options);
      });
    };
  }, []);

  const onClickReBound = () => {
    const moveLatLon = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude,
    );
    kakaoMapRef.current.panTo(moveLatLon);
  };

  return (
    <div id="static_map" className="w-full h-screen relative">
      {children}
      {/* TODO: ReBoundButton position 조정 필요*/}
      <ReBoundButton
        onClickReBound={onClickReBound}
        position={{
          top: '',
          right: 'left-[10px]',
          bottom: 'bottom-[80px]',
          left: '',
        }}
      />
    </div>
  );
};

export default KakaoMap;
