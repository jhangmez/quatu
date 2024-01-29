'use client'

import React from 'react'
import { Suspense } from 'react'
import Loading from './loading'
import { useState, useEffect, useMemo } from 'react'
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
import { GithubJhan, LinkedinJhan, VercelHarkaysoft } from '@routes'
import localFont from 'next/font/local'
import { Divider } from '@nextui-org/divider'
const myFont = localFont({ src: './Poppins-SemiBold.ttf' })
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

export default function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    isLogin().then(setIsLoggedIn)
  }, [])

  return (
    <main className='min-h-screen bg-light-surface dark:bg-dark-surface'>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
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
              viewBox='0 0 24 24'
              className='text-light-primary dark:text-dark-primary'
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
          {isLoggedIn ? (
            <NavbarItem>
              <Button
                as={Link}
                className='bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary'
                href='/home'
                variant='flat'
              >
                Ingresar
              </Button>
            </NavbarItem>
          ) : (
            <>
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
            </>
          )}
        </NavbarContent>

        <NavbarMenu className='bg-white/90'>
          <Listbox
            className='flex flex-1 flex-col gap-y-4 pt-2'
            aria-label='Listado de items'
            itemClasses={{
              base: 'p-2.5 data-[hover=true]:bg-default-100/80',
              title: 'text-lg'
            }}
          >
            {listadomenu.map((submenu) => (
              <ListboxItem
                key={submenu.key}
                href={submenu.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {submenu.label}
              </ListboxItem>
            ))}
          </Listbox>
        </NavbarMenu>
      </Navbar>
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <footer className='bg-light-surface dark:bg-dark-surface'>
        <div className='container mx-auto py-6 px-[20px] '>
          <Divider className='my-6 lg:my-8 bg-light-surfaceVariant dark:bg-dark-surfaceVariant' />
          <div className='w-full relative md:flex md:justify-between'>
            <div className='mb-6 md:mb-0'>
              <Link
                href='/'
                className='w-[230px] h-14 justify-start items-center gap-[5px] inline-flex'
              >
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
                <div>
                  <span className='text-light-onSurface dark:text-dark-onSurface text-2xl font-bold leading-[44px]'>
                    qua
                  </span>
                  <span className='text-light-primary dark:text-dark-primary text-2xl font-bold leading-[44px]'>
                    Tu
                  </span>
                </div>
              </Link>
            </div>
            <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2'>
              <div>
                <h2 className='mb-6 text-sm font-semibold uppercase text-light-onSurface dark:text-dark-onSurface'>
                  Social
                </h2>
                <ul className=''>
                  <li className='mb-4'>
                    <Link
                      href={GithubJhan}
                      className='hover:underline font-medium text-gray-500 dark:text-gray-400'
                      showAnchorIcon
                      isExternal
                    >
                      Github
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={LinkedinJhan}
                      className='hover:underline font-medium text-gray-500 dark:text-gray-400'
                      showAnchorIcon
                      isExternal
                    >
                      LinkedIn
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className='mb-6 text-sm font-semibold uppercase text-light-onSurface dark:text-dark-onSurface'>
                  Proyectos
                </h2>
                <ul className=''>
                  <li className='mb-4'>
                    <Link
                      href={VercelHarkaysoft}
                      className='hover:underline text-gray-500 dark:text-gray-400 font-medium'
                      isExternal
                    >
                      <span
                        className={`${myFont.className} self-center text-1xl whitespace-nowrap pb-3`}
                      >
                        Harkay
                        <span
                          className={`${myFont.className} text-2xl text-[0.8em]`}
                        >
                          {' '}
                          S O F T
                        </span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Divider className='my-6 lg:my-8 bg-light-surfaceVariant dark:bg-dark-surfaceVariant' />
          <div className='sm:flex sm:items-center sm:justify-between'>
            <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
              © 2023{'  '}
              <Link
                href={VercelHarkaysoft}
                className='hover:underline text-gray-500 sm:text-center dark:text-gray-400'
                isExternal
              >
                <span
                  className={`${myFont.className} self-center text-1xl whitespace-nowrap pb-3`}
                >
                  Harkay
                  <span className={`${myFont.className} text-2xl text-[0.8em]`}>
                    {' '}
                    S O F T
                  </span>
                </span>
              </Link>
              . Todos los derechos reservados.
            </span>
            <div className='flex mt-4 space-x-5 sm:justify-center sm:mt-0'>
              <div className='hover:text-gray-900 dark:hover:text-white'>
                <Link
                  href={GithubJhan}
                  isExternal
                  className='text-light-onSurface dark:text-dark-onSurface'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2'
                    />
                  </svg>
                </Link>
              </div>
              <div className='text-light-onSurface dark:text-dark-onSurface hover:text-gray-900 dark:hover:text-white'>
                <Link
                  href={LinkedinJhan}
                  isExternal
                  className='text-light-onSurface dark:text-dark-onSurface'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z'
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
