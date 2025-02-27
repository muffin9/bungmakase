/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';
import ReBoundButton from '../map/ReBoundButton';
import useGeolocation from '@/hooks/map/useGeolocation';
import { useCurrentAddress } from '@/store/useCurrentAddress';
import { useGetMarkersInBounds } from '@/api/map/marker';
import { MarkerType } from '@/types/map';

interface KakaoMapProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = ({ children }: KakaoMapProps) => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const markerRef = useRef<any>(null);

  const { location } = useCurrentAddress();
  const { myLocation } = useGeolocation();

  const { data: markersInBounds } = useGetMarkersInBounds({
    sw: { lat: location.latitude - 0.1, lng: location.longitude - 0.1 },
    ne: { lat: location.latitude + 0.1, lng: location.longitude + 0.1 },
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('static_map');
        const options = {
          center: new window.kakao.maps.LatLng(
            location.latitude || myLocation.latitude,
            location.longitude || myLocation.longitude,
          ),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        setMyMarker(myLocation.latitude, myLocation.longitude);

        const newMarkers = [] as any;
        const bungMarkerSize = new window.kakao.maps.Size(34, 34);
        const bungMarkerImage = new window.kakao.maps.MarkerImage(
          '/images/bung_marker.png',
          bungMarkerSize,
        );

        if (window.kakao.maps && markersInBounds) {
          markersInBounds.forEach((markerData: MarkerType) => {
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: new window.kakao.maps.LatLng(
                markerData.latitude,
                markerData.longitude,
              ),
              image: bungMarkerImage,
              zIndex: 10,
            });

            newMarkers.push(marker);
          });

          newMarkers.forEach((marker: any) => marker.setMap(mapRef.current));
        }
      });
    };

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [location.latitude, location.longitude, markersInBounds]);

  const setMyMarker = (latitude: number, longitude: number) => {
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    const imageSize = new window.kakao.maps.Size(55, 55);
    const markerImage = new window.kakao.maps.MarkerImage(
      '/images/my_position.png',
      imageSize,
    );

    const myMarkerPosition = new window.kakao.maps.LatLng(latitude, longitude);

    const myMarker = new window.kakao.maps.Marker({
      position: myMarkerPosition,
      image: markerImage,
    });

    myMarker.setMap(mapRef.current);
    markerRef.current = myMarker;
  };

  const onClickReBound = () => {
    const moveLatLon = new window.kakao.maps.LatLng(
      myLocation.latitude,
      myLocation.longitude,
    );
    if (mapRef.current) {
      mapRef.current.panTo(moveLatLon);
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
