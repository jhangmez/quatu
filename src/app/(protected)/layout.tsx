import { Suspense } from 'react'
import { Providers } from './providers'
import Loading from './loading'
import Header from '@components/(all)/Header'
import Aside from '@components/(all)/Aside'

export default function LayoutHome({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className='h-full'>
      <Providers>
        <Header />
        <div className='flex h-max dark:bg-dark-inverseSurface'>
          <Aside />
          <div className='flex overflow-auto h-screen w-full'>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
      </Providers>
    </main>
  )
}
