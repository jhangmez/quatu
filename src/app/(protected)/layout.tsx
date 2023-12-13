'use client'

import { useState, useMemo } from 'react'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { Link } from '@nextui-org/link'
import { useSession } from 'next-auth/react'
import { User } from '@nextui-org/user'
import { Avatar } from '@nextui-org/avatar'
import { Spinner } from '@nextui-org/react'
import { Skeleton } from '@nextui-org/skeleton'
import { useQuery } from '@apollo/client'
import { Myself } from '@lib/graphql/query'
import { Suspense } from 'react'
import Loading from './loading'
import { signOut } from 'next-auth/react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/dropdown'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu
} from '@nextui-org/navbar'

export default function LayoutHome({
  children
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { loading, error, data, refetch } = useQuery(Myself)

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
  return (
    <main>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className='bg-light-surface dark:bg-dark-surface text-light-onSurface dark:text-dark-onSurface flex lg:hidden md:hidden'
      >
        <NavbarContent className='' justify='start'>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </NavbarContent>

        <NavbarContent className=' pr-3' justify='center'>
          <NavbarBrand>
            <Link className='hover:underline' target='_blank'>
              <div>
                <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
                  Harkay
                  <span className='text-2xl text-[0.8em] font-normal'>
                    {' '}
                    S O F T
                  </span>
                </span>
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent as='div' className='items-center' justify='end'>
          {loading ? (
            <div className='max-w-[300px] w-full flex items-center gap-3'>
              <div>
                <Skeleton className='flex rounded-full w-12 h-12' />
              </div>
            </div>
          ) : error ? (
            <p className='text-light-onSurface dark:text-dark-onSurface'>
              Error {error.message}
            </p>
          ) : (
            <>
              <Dropdown placement='bottom-end'>
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as='button'
                    showFallback
                    className='transition-transform'
                    name={data?.me?.name || ''}
                    size='sm'
                    src='/user_picture.jpg'
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label='Profile Actions' variant='flat'>
                  <DropdownItem className='h-16 gap-2'>
                    <p className='font-semibold'>Ingresado como</p>
                    <p>{data?.me?.name || ''}</p>
                    <p className='text-sm text-light-onPrimaryFixed'>
                      @{data?.me?.username} - {data?.me?.company?.name}
                    </p>
                  </DropdownItem>
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
            </>
          )}
        </NavbarContent>

        <NavbarMenu>
          <Listbox className='flex flex-1 flex-col gap-y-4 pt-2'>
            <ListboxSection title='Producto' showDivider>
              <ListboxItem key='listarproductos' href='/producto'>
                Listar productos
              </ListboxItem>
              <ListboxItem key='agregarproducto' href='/categoria'>
                Agregar producto
              </ListboxItem>
            </ListboxSection>
            <ListboxSection title='Categoria' showDivider>
              <ListboxItem key='agregarcategoria' href='/producto'>
                Agregar categoria
              </ListboxItem>
              <ListboxItem key='agregarsubcategoria' href='/categoria'>
                Agregar subcategoria
              </ListboxItem>
            </ListboxSection>
          </Listbox>
        </NavbarMenu>
      </Navbar>

      <div className='flex dark:bg-dark-inverseSurface'>
        <aside className='flex h-screen lg:w-[15%] md:w-[25%] w-[45%] flex-col items-center border-r border-gray-200 bg-light-surface dark:bg-dark-surface text-light-onSurface dark:text-dark-onSurface lg:flex md:flex hidden'>
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
            <ListboxSection title='Producto' showDivider>
              <ListboxItem key='listarproductos' href='/producto'>
                Listar productos
              </ListboxItem>
              <ListboxItem key='agregarproducto' href='/categoria'>
                Agregar producto
              </ListboxItem>
            </ListboxSection>
            <ListboxSection title='Categoria' showDivider>
              <ListboxItem key='agregarcategoria' href='/producto'>
                Agregar categoria
              </ListboxItem>
              <ListboxItem key='agregarsubcategoria' href='/categoria'>
                Agregar subcategoria
              </ListboxItem>
            </ListboxSection>
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
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </main>
  )
}
