'use client'

import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar
} from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { Skeleton } from '@nextui-org/skeleton'
import { useQuery } from '@apollo/client'
import { Myself } from '@lib/graphql/query'
import { signOut } from 'next-auth/react'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { loading, error, data, refetch } = useQuery(Myself)

  const menuItems = [
    'Profile',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out'
  ]

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className='bg-light-onTertiary dark:bg-dark-onTertiary'
    >
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarContent className='sm:hidden pr-3' justify='center'>
        <NavbarBrand>
          <Link
            href='/home'
            className='w-fit h-14 justify-start items-center gap-[5px] inline-flex'
          >
            <Icon
              icon='icon-park-outline:sport'
              width='28'
              height='28'
              className='text-light-onSurface dark:text-dark-onSurface'
            />
            <div>
              <span className='text-light-onSurface dark:text-dark-onSurface text-2xl font-bold leading-[44px]'>
                In
              </span>
              <span className='text-light-primary dark:text-dark-primary text-2xl font-bold leading-[44px]'>
                Deportiva
              </span>
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarBrand>
          <Link
            href='/home'
            className='w-fit h-14 justify-start items-center gap-[5px] inline-flex'
          >
            <Icon
              icon='icon-park-outline:sport'
              width='28'
              height='28'
              className='text-light-onSurface dark:text-dark-onSurface'
            />
            <div>
              <span className='text-light-onSurface dark:text-dark-onSurface text-2xl font-bold leading-[44px]'>
                In
              </span>
              <span className='text-light-primary dark:text-dark-primary text-2xl font-bold leading-[44px]'>
                Deportiva
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
                <DropdownItem className='h-14 gap-2'>
                  <p className='font-semibold'>Ingresado como</p>
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
              color={
                index === 2
                  ? 'warning'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
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
