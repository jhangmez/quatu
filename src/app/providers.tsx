'use client'

import { SessionProvider } from 'next-auth/react'
import { ApolloWrapper } from '@lib/graphql'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'

import { uploadRouter } from '@api/uploadthing/core'

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <SessionProvider>
      <ApolloWrapper>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(uploadRouter)}
        />
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
      </ApolloWrapper>
    </SessionProvider>
  )
}
