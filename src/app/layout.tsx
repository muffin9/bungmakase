import type { Metadata } from 'next';
import '../styles/globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Kko bung!',
  description: 'Kko bung!',
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
          <section className="w-[375px] h-screen">{children}</section>
        </Providers>
      </body>
    </html>
  );
}
