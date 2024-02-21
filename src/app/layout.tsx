import localFont from 'next/font/local'
import './globals.css'
import { Providers } from './providers'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'
import Loading from './loading'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'

import { uploadRouter } from '@api/uploadthing/core'

const myFont = localFont({ src: './LexendDeca-VariableFont_wght.ttf' })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body
        className={`${myFont.className} selection:bg-light-primary selection:text-light-onPrimary dark:selection:bg-dark-primary dark:selection:text-dark-onPrimary`}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(uploadRouter)} />
        <Providers>
          <Toaster />
          <noscript>Página realizada por @jhangmez de HarkaySoft</noscript>
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
