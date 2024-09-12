import { Inter } from 'next/font/google'
import './styles/globals.css'
import { GeneralSansFont, MichromaFont, MontFont, SpaceFont } from './font';
import { Providers } from './providers/Providers';

export const metadata = {
  title: {
    template: "ExaminationSystem - %s",
    default: "ExaminationSystem",
  },
  metadataBase: new URL('https://google.com'),
  description:
    'Write and Take An Exam!',
  keyword: [
    'Examination System',
    'AI',
  ],
  openGraph: {

    url: 'https://google.com',
    siteName: 'ExaminationSystem',
    images: [
      {
        url: 'https://www.projexplanr.vercel.app/images/exam_system.jpg',
        width: 800,
        height: 600,
      },
      {
        url: 'https://www.projexplanr.vercel.app/images/exam_system.jpg',
        width: 1800,
        height: 1600,
        alt: 'Examination System',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.png', size: '16x16' },
      { url: '/icons/favicon-32x32.png', size: '32x32' },
    ],
    shortcut: '/icons/favicon-32x32.png',
    apple: '/icons/apple-touch-icon.png',
    andriod: [
      {
        url: '/icons/android-chrome-192x192.png',
        size: '192x192',
      },
      {
        url: '/icons/android-chrome-512x512.png',
        size: '512x512',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${GeneralSansFont.variable} ${GeneralSansFont.className} ${MichromaFont.variable}`} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
