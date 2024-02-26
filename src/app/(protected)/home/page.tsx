'use client'

import { useContext } from 'react'
import { UserContext } from '@utils/userContext'
import { Skeleton } from '@nextui-org/skeleton'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'

export default function Home() {
  const {
    loading: loadMe,
    error: errorMe,
    data: dataMe,
    refetch: refetchMe
  } = useContext(UserContext)

  const storeStatus: number = 1

  return (
    <section className='container mx-auto py-5 lg:px-8 md:px-5 px-3'>
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
      <Card className='w-fit'>
        <CardHeader>
          <h2 className='font-semibold text-xl'>Estado de tu tienda</h2>
        </CardHeader>
        <CardBody>
          {storeStatus === 1 && (
            <>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='180'
                height='180'
                viewBox='0 0 24 24'
                className='text-success'
              >
                <path
                  fill='currentColor'
                  d='m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8'
                />
              </svg>
              <p>En línea</p>
            </>
          )}
          {storeStatus === 2 && (
            <>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='180'
                height='180'
                viewBox='0 0 24 24'
                className='text-light-error'
              >
                <path
                  fill='currentColor'
                  d='M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z'
                />
              </svg>
              <p className='text-light-onSurface font-semibold text-lg'>
                Cerrada
              </p>
            </>
          )}
          {storeStatus === 3 && (
            <>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='180'
                height='180'
                viewBox='0 0 24 24'
                className='text-warning'
              >
                <path
                  fill='currentColor'
                  d='M13 16V8h2v8zm-4 0V8h2v8zm3-14a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8'
                />
              </svg>
              <p>En pausa</p>
            </>
          )}
        </CardBody>
      </Card>
    </section>
  )
}
