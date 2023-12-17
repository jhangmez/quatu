'use client'

import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Button, Spinner } from '@nextui-org/react'
import { Skeleton } from '@nextui-org/skeleton'
import { Divider } from '@nextui-org/divider'
import { useQuery } from '@apollo/client'
import { Myself } from '@lib/graphql/query'
import ChangePassword from '@components/(all)/ChangePassword'
import RootChangePassword from '@components/(root)/ChangePassword'
import DangerZone from '@components/(admin)/DangerZone'

export default function Settings() {
  const { loading, error, data, refetch } = useQuery(Myself)

  return (
    <>
      <div className='container mx-auto py-5 lg:px-8 md:px-5 px-3'>
        <h2 className='text-4xl mb-3'>Configuraciones</h2>
        <section className='flex flex-col gap-5 pb-5'>
          {loading ? (
            <>
              <Card className='w-auto h-fit' radius='lg'>
                <Skeleton className='rounded-lg'>
                  <div className='h-24 rounded-lg bg-default-300'></div>
                </Skeleton>
              </Card>

              <Card className='w-auto h-fit' radius='lg'>
                <Skeleton className='rounded-lg'>
                  <div className='h-24 rounded-lg bg-default-300'></div>
                </Skeleton>
              </Card>
              <Card className='w-auto h-fit' radius='lg'>
                <Skeleton className='rounded-lg'>
                  <div className='h-24 rounded-lg bg-default-300'></div>
                </Skeleton>
              </Card>
            </>
          ) : error ? (
            <p className='text-light-onSurface dark:text-dark-onSurface'>
              Error {error?.message}
            </p>
          ) : (
            <>
              <Card className='w-auto h-fit'>
                <CardHeader className='text-2xl'>Empresa</CardHeader>
                <Divider />
                <CardBody>
                  <p>Nombre: {data?.me?.company?.name}</p>

                  {data?.me?.typeuser?.id !== 3 && (
                    <p>
                      Tipo de Suscripcion:{' '}
                      {data?.me?.company?.suscription?.name}
                    </p>
                  )}
                </CardBody>
              </Card>
              <Card className='w-auto h-fit'>
                <CardHeader className='text-2xl'>Perfil</CardHeader>
                <Divider />
                <CardBody>
                  <p>Nombre: {data?.me?.name}</p>
                  <p>Nombre de usuario: @{data?.me?.username}</p>
                  <p>Tienes Permisos de {data?.me?.typeuser?.name}</p>
                  <p>Tienes permisos como:</p>
                  <p>AGREGAR LOS PERMISOS SEGUN CADA USUARIO</p>
                </CardBody>
              </Card>
              <ChangePassword />
              {data?.me?.typeuser?.id === 1 && <RootChangePassword />}
              {data?.me?.typeuser?.id !== 3 && <DangerZone />}
            </>
          )}
        </section>
      </div>
    </>
  )
}
