'use client'

import { useState, useEffect } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu
} from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'
import { isLogin } from '@utils/authLink'
import { Listbox, ListboxItem } from '@nextui-org/react'

const listadomenu = [
  {
    key: 'ayuda',
    label: 'Ayuda & Feedback',
    href: '/ayuda'
  },
  {
    key: 'contacto',
    label: 'Contactar con HarkaySoft',
    href: '/contacto'
  }
]
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    isLogin().then(setIsLoggedIn)
  }, [])

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      shouldHideOnScroll
      isBlurred={false}
      className='bg-light-background dark:bg-dark-background text-light-onSurface dark:text-dark-onSurface'
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand as={Link} href='/'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='28'
            height='28'
            className='text-light-primary dark:text-dark-primary'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M4 6V4h16v2zm0 14v-6H3v-2l1-5h16l1 5v2h-1v6h-2v-6h-4v6zm2-2h6v-4H6z'
            />
          </svg>
          <span className='text-light-onSurface dark:text-dark-onSurface text-2xl font-bold leading-[44px]'>
            qua
          </span>
          <span className='text-light-primary dark:text-dark-primary text-2xl font-bold leading-[44px]'>
            Tu
          </span>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {/* <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className='p-0 bg-transparent data-[hover=true]:bg-transparent text-light-onSurface dark:text-dark-onSurface text-base'
                  endContent={
                    <Icon
                      icon='icon-park-outline:down'
                      width='16'
                      height='16'
                      className='text-light-onSurface dark:text-dark-onSurface'
                    />
                  }
                  radius='sm'
                  variant='light'
                >
                  Features
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label='qaTu features'
              className='w-[340px]'
              itemClasses={{
                base: 'gap-4'
              }}
            >
              <DropdownItem
                key='autoscaling'
                description='ACME scales apps to meet user demand, automagically, based on load.'
                startContent={
                  <Icon
                    icon='material-symbols:store'
                    width='16'
                    height='16'
                    className='text-light-onSurface dark:text-dark-onSurface'
                  />
                }
              >
                Autoscaling
              </DropdownItem>
              <DropdownItem
                key='supreme_support'
                description='Overcome any challenge with a supporting team ready to respond.'
                startContent={
                  <Icon
                    icon='material-symbols:store'
                    width='16'
                    height='16'
                    className='text-light-onSurface dark:text-dark-onSurface'
                  />
                }
              >
                +Supreme Support
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> */}

        <NavbarItem isActive>
          <Link
            href='/precios'
            aria-current='page'
            className='text-light-primary dark:text-dark-primary'
          >
            Precios
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
            <Link
              href='#'
              className='text-light-onSurface dark:text-dark-onSurface'
            >
              Integrations
            </Link>
          </NavbarItem> */}
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link
            className='text-light-primary dark:text-dark-primary'
            href={isLoggedIn ? '/home' : '/login'}
          >
            Ingresar
          </Link>
        </NavbarItem>
        <NavbarItem className='flex lg:hidden'>
          <Link
            className='text-light-primary dark:text-dark-primary'
            href={isLoggedIn ? '/home' : '/login'}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M12.08 4.08L20 12l-7.92 7.92l-1.41-1.42l5.5-5.5H2v-2h14.17l-5.5-5.5zM20 12v10h2V2h-2z'
              />
            </svg>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            className='bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary'
            href='/demo'
            variant='flat'
          >
            Demo
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <Listbox
          className='flex flex-1 flex-col gap-y-4 pt-2'
          aria-label='Listado de items'
        >
          {listadomenu.map((submenu) => (
            <ListboxItem
              key={submenu.key}
              href={submenu.href}
              className=''
              onClick={() => setIsMenuOpen(false)}
            >
              {submenu.label}
            </ListboxItem>
          ))}
        </Listbox>
      </NavbarMenu>
    </Navbar>
  )
}
