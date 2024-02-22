'use client'

import { Link } from '@nextui-org/link'
import { useSession } from 'next-auth/react'
import { Spinner } from '@nextui-org/react'
import { useQuery } from '@apollo/client'
import { Myself } from '@lib/graphql/query'
import { UserContext } from '@utils/userContext'

export function Providers({ children }: { children: React.ReactNode }) {
  const { loading, error, data, refetch } = useQuery(Myself)
  const { status } = useSession()

  if (status === 'loading') {
    return (
      <div className='flex flex-col justify-center items-center h-screen bg-light-background dark:bg-dark-background'>
        <section className='w-fit h-14 justify-start items-center gap-[5px] inline-flex'>
          <div>
            <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
              Harkay
              <span className='text-2xl text-[0.8em] font-normal'>
                {' '}
                S O F T
              </span>
            </span>
          </div>
        </section>

        <div className='container flex flex-col items-center'>
          <Spinner />

          <p className='text-light-onBackground dark:text-dark-onBackground mt-4'>
            Verificando acceso...
          </p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className='flex flex-col justify-center items-center h-screen bg-light-errorContainer dark:bg-dark-errorContainer'>
        <section className='w-fit h-14 justify-start items-center gap-[5px] inline-flex'>
          <div>
            <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
              Harkay
              <span className='text-2xl text-[0.8em] font-normal'>
                {' '}
                S O F T
              </span>
            </span>
          </div>
        </section>

        <div className='container flex flex-col items-center'>
          <p className='text-light-onErrorContainer dark:text-dark-onErrorContainer mt-4'>
            Acceso Denegado.
          </p>
          <Link
            className='text-light-primary dark:text-dark-primary'
            href='/login'
          >
            Ingresar
          </Link>
        </div>
      </div>
    )
  }
  // Asegúrate de que error y data sean null si son undefined
  const providerValue = {
    loading,
    error: error ?? null,
    data: data ?? null,
    refetch
  }

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  )
}
