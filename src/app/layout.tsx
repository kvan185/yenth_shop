import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { TrackingEvents } from '@/components/TrackingEvents';
import './globals.css';

export const metadata: Metadata = {
  applicationName: 'YenTH Shop',
  category: 'technology',
  metadataBase: new URL('https://yenth.shop'),
  title: {
    default: 'YenTH Shop - Thiết kế website bán hàng, landing page và portfolio',
    template: '%s | YenTH Shop',
  },
  description:
    'Dịch vụ thiết kế website chuyên nghiệp cho cá nhân, cửa hàng và doanh nghiệp nhỏ: landing page, website bán hàng, portfolio, SEO nền tảng và bàn giao dễ quản trị.',
  keywords: [
    'yenth.shop',
    'thiết kế website bán hàng',
    'thiết kế landing page',
    'làm website chuyên nghiệp',
    'thiết kế website',
    'website portfolio cá nhân',
    'dịch vụ làm website',
  ],
  openGraph: {
    title: 'YenTH Shop - Thiết kế website bán hàng, landing page và portfolio',
    description: 'Làm website rõ dịch vụ, đẹp trên mobile, có SEO nền tảng và CTA đủ mạnh để khách để lại thông tin.',
    url: 'https://yenth.shop',
    siteName: 'YenTH Shop',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'YenTH Shop - Thiết kế website bán hàng, landing page và portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YenTH Shop - Thiết kế website bán hàng, landing page và portfolio',
    description: 'Website đẹp, rõ dịch vụ, có SEO nền tảng và CTA đủ mạnh để khách để lại thông tin.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'ROOive0DtoaDmIafdJXnVCyqUDqJoRTaU0txizrQFkg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#073c34',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="vi">
      <body>
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        {gtmId ? (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        ) : null}
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { send_page_view: true });
              `}
            </Script>
          </>
        ) : null}
        <TrackingEvents />
        {children}
      </body>
    </html>
  );
}
