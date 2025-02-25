import type { Metadata } from 'next';
import '../styles/globals.css';
import { Providers } from './providers';
import { gmarketSans, OwnglyphPDH } from '@/styles/font';
import { NavigationWrapper } from '@/components/common/Navigation/NavigationWrapper';
import { GlobalModal } from '@/components/common/GlobalModal';

export const metadata: Metadata = {
  title: '붕마카세',
  description: '붕마카세 Description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`flex justify-center ${gmarketSans.variable} ${OwnglyphPDH.variable} font-gmarket`}
      >
        <Providers>
          <section className="w-full h-screen xs:w-[375px]">{children}</section>
          <NavigationWrapper />
          <GlobalModal />
        </Providers>
      </body>
    </html>
  );
}
