/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';
import ReBoundButton from '../map/ReBoundButton';
import useGeolocation from '@/hooks/map/useGeolocation';
import { defaultCoords } from '@/constants/map';
import { useCurrentAddress } from '@/store/useCurrentAddress';

interface KakaoMapProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = ({ children }: KakaoMapProps) => {
  const kakaoMapRef = useRef<HTMLElement | null | any>(null);
  const { setRoadAddress } = useCurrentAddress();
  const { location } = useGeolocation();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
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

        const map = new window.kakao.maps.Map(container, options);
        kakaoMapRef.current = map;

        const geocoder = new window.kakao.maps.services.Geocoder();

        window.kakao.maps.event.addListener(map, 'center_changed', () => {
          const center = map.getCenter();
          getAddressFromCoords(center, geocoder);
        });

        getAddressFromCoords(map.getCenter(), geocoder);
      });
    };
  }, []);

  const getAddressFromCoords = (coords: any, geocoder: any) => {
    geocoder.coord2Address(
      coords.getLng(),
      coords.getLat(),
      (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const roadAddress = result[0].address?.address_name;
          setRoadAddress(roadAddress);
        }
      },
    );
  };

  const onClickReBound = () => {
    const moveLatLon = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude,
    );
    if (kakaoMapRef.current) {
      kakaoMapRef.current.panTo(moveLatLon);
    }
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
