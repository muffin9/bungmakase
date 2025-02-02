import localFont from 'next/font/local';

export const gmarketSans = localFont({
  src: [
    {
      path: '../../public/fonts/GmarketSansTTFLight.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GmarketSansTTFMedium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GmarketSansTTFBold.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-gmarket',
});

export const OwnglyphPDH = localFont({
  src: [
    {
      path: '../../public/fonts/OwnglyphPDH.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-OwnglyphPDH',
});
