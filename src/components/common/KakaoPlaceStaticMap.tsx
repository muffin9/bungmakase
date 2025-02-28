/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoPlaceStaticMapProps {
  latitude: number;
  longitude: number;
}

const KakaoPlaceStaticMap = ({
  latitude,
  longitude,
}: KakaoPlaceStaticMapProps) => {
  const kakaoMapRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const imageSize = new window.kakao.maps.Size(24, 24);
        const markerImage = new window.kakao.maps.MarkerImage(
          '/images/my_marker.png',
          imageSize,
        );

        const container = document.getElementById('static_map');

        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 5,
        };
        kakaoMapRef.current = new window.kakao.maps.Map(container, options);

        const myMarkerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude,
        );

        const marker = new window.kakao.maps.Marker({
          position: myMarkerPosition,
          image: markerImage,
        });

        marker.setMap(kakaoMapRef.current);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div className={`w-full h-[150px] rounded-lg`} id="static_map" />;
};

export default KakaoPlaceStaticMap;
