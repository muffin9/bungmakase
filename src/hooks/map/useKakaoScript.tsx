/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Script from 'next/script';

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoScript() {
  return (
    <>
      {/* Kakao SDK */}
      <Script
        src="//developers.kakao.com/sdk/js/kakao.js"
        strategy="afterInteractive"
      />
    </>
  );
}

export default KakaoScript;
