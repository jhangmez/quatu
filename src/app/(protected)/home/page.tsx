'use client'

import { Myself } from '@lib/graphql/query'
import { useQuery } from '@apollo/client'
import { Skeleton } from '@nextui-org/skeleton'

export default function Home() {
  const {
    loading: loadMe,
    error: errorMe,
    data: dataMe,
    refetch: refetchMe
  } = useQuery(Myself)
  return (
    <section>
      <p>
        Bienvenido al Dashboard de la tienda
        {loadMe ? (
          <Skeleton className='h-3 w-3/5 rounded-lg' />
        ) : errorMe ? (
          <p className='text-light-onSurface dark:text-dark-onSurface'>
            Hubo un error: {errorMe.message}
          </p>
        ) : (
          <> {dataMe?.me?.company?.name || ''}</>
        )}
      </p>
      {loadMe ? (
        <Skeleton className='h-3 w-3/5 rounded-lg' />
      ) : errorMe ? (
        <p className='text-light-onSurface dark:text-dark-onSurface'>
          Hubo un error: {errorMe.message}
        </p>
      ) : (
        <p>{dataMe?.me?.name || ''}</p>
      )}
      <h1></h1>
    </section>
  )
}
