import type { Metadata } from 'next';
import '../styles/globals.css';
import { Providers } from './providers';

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
      <body className="flex justify-center">
        <Providers>
          <section className="w-full h-screen xs:w-[375px]">{children}</section>
        </Providers>
      </body>
    </html>
  );
}
