'use client'

import { SessionProvider } from 'next-auth/react'
import { ApolloWrapper } from '@lib/graphql'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <SessionProvider>
      <ApolloWrapper>
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
      </ApolloWrapper>
    </SessionProvider>
  )
}
