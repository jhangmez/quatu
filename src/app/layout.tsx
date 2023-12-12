import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from './providers'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'
import AuthStatus from '@components/Auth/auth-status'
import { Suspense } from 'react'

const myFont = localFont({ src: './LexendDeca-VariableFont_wght.ttf' })

const title = 'tuTi | Tu tienda virtual'
const description = 'Tu tienda virtual'

export const metadata: Metadata = {
  title,
  description
  // twitter: {
  //   card: 'summary_large_image',
  //   title,
  //   description
  // }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${myFont.className} selection:bg-light-primary selection:text-light-onPrimary dark:selection:bg-dark-primary dark:selection:text-dark-onPrimary`}
      >
        <Providers>
          <Toaster />
          {/* <Suspense fallback='Loading...'>
            <AuthStatus />
          </Suspense> */}
          <noscript>Página realizada por @jhangmez de HarkaySoft</noscript>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
