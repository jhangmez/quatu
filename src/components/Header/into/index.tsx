'use client'

import { useState, useMemo } from 'react'
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
  NavbarMenu,
  NavbarMenuItem
} from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { Skeleton } from '@nextui-org/skeleton'
import { useQuery } from '@apollo/client'
import { Myself } from '@lib/graphql/query'
import { signOut } from 'next-auth/react'
import { Avatar } from '@nextui-org/avatar'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { loading, error, data, refetch } = useQuery(Myself)

  const menuItems = useMemo(() => ['Agregar Producto', 'Agregar categoria'], [])

  return (
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

      <NavbarContent className='sm:hidden pr-3' justify='center'>
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

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
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
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className='w-full'
              // color={
              //   index === 2
              //     ? 'warning'
              //     : index === menuItems.length - 1
              //     ? 'danger'
              //     : 'foreground'
              // }
              color='foreground'
              href='#'
              size='lg'
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
