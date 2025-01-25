'use client';

import { useEffect, useRef } from 'react';

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
  const kakaoMapRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('static_map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        kakaoMapRef.current = new window.kakao.maps.Map(container, options);
      });
    };
  }, []);

  return (
    <div id="static_map" className="w-full h-screen">
      {children}
    </div>
  );
};

export default KakaoMap;
