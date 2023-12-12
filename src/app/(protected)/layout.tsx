'use client'

import Header from '@components/Header/into'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { Link } from '@nextui-org/link'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { usePathname } from 'next/navigation'
import { useSession, getSession } from 'next-auth/react'
import { User } from '@nextui-org/user'
import { Icon } from '@iconify/react'
import { Spinner } from '@nextui-org/react'
import { Skeleton } from '@nextui-org/skeleton'
import { useQuery } from '@apollo/client'
import { Myself } from '@lib/graphql/query'
import { signOut } from 'next-auth/react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from '@nextui-org/dropdown'

export default function LayoutHome({
  children
}: {
  children: React.ReactNode
}) {
  const { loading, error, data, refetch } = useQuery(Myself)

  const pathname = usePathname()
  const { data: session, status } = useSession()

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
          <Link href='/login'>Ingresar</Link>
        </div>
      </div>
    )
  }
  return (
    <main>
      {/* <Header /> */}
      {/* <div className='flex'>
        <aside className='h-screen lg:max-w-[20%] md:max-w-[25%] max-w-[30%] bg-light-surface dark:bg-dark-surface text-light-onSurface dark:text-dark-onSurface'>
          <Listbox className=''>
            <ListboxItem key='home' href='/producto'>
              Agregar producto
            </ListboxItem>
            <ListboxItem key='about' href='/categoria'>
              Agregar categoriaaaaaaaaaaaaaaaaaaaaaaaaa
            </ListboxItem>
            <ListboxItem key='user' className=''>
              <User
                name='Jane Doe'
                description='Product Designer'
                avatarProps={{
                  src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
                }}
              />
            </ListboxItem>
          </Listbox>
        </aside>

        <div className='w-full p-4'>{children}</div>
      </div> */}
      <div className='flex dark:bg-dark-inverseSurface'>
        <aside className='flex h-screen lg:w-[15%] md:w-[25%] w-[45%] flex-col items-center border-r border-gray-200 bg-light-surface dark:bg-dark-surface text-light-onSurface dark:text-dark-onSurface'>
          <div className='flex h-[4.5rem] w-full items-center justify-center border-b border-gray-200 p-2'>
            <section className='w-fit h-14 justify-start items-center gap-[5px] inline-flex'>
              <div>
                <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-dark'>
                  Harkay
                  <span className='text-2xl text-[0.8em] font-normal'>
                    {' '}
                    S O F T
                  </span>
                </span>
              </div>
            </section>
          </div>

          <Listbox className='flex flex-1 flex-col gap-y-4 pt-2'>
            <ListboxItem key='home' href='/producto'>
              Agregar producto
            </ListboxItem>
            <ListboxItem key='about' href='/categoria'>
              Agregar categoriaaaaaaaaaaaaaaaaaaaaaaaaa
            </ListboxItem>
          </Listbox>

          {loading ? (
            <div className='max-w-[300px] w-full flex items-center gap-3'>
              <div>
                <Skeleton className='flex rounded-full w-12 h-12' />
              </div>
              <div className='w-full flex flex-col gap-2'>
                <Skeleton className='h-3 w-3/5 rounded-lg' />
                <Skeleton className='h-3 w-4/5 rounded-lg' />
              </div>
            </div>
          ) : error ? (
            <p className='text-light-onSurface dark:text-dark-onSurface'>
              Hubo un error: {error.message}
            </p>
          ) : (
            <>
              <Listbox className='flex flex-col items-center gap-y-4 '>
                <ListboxItem key='user'>
                  <Dropdown>
                    <DropdownTrigger>
                      <User
                        name={data?.me?.name || ''}
                        description={
                          <>
                            @{data?.me?.username}
                            <br />
                            {data?.me?.company?.name}
                          </>
                        }
                        avatarProps={{
                          src: '/user_picture.jpg'
                        }}
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label='Static Actions'>
                      <DropdownItem key='configurations'>
                        Configuraciones
                      </DropdownItem>
                      <DropdownItem key='help_and_feedback'>
                        Ayuda & Feedback
                      </DropdownItem>
                      <DropdownItem
                        key='logout'
                        color='danger'
                        className='text-danger'
                        onPress={() => signOut()}
                      >
                        Cerrar sesión
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ListboxItem>
              </Listbox>
            </>
          )}
        </aside>
        {children}
      </div>
    </main>
  )
}
