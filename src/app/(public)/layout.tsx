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
  NavbarMenu,
  NavbarMenuItem
} from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'
import { Icon } from '@iconify/react'
import { isLogin } from '@utils/authLink'
import { GithubJhan, LinkedinJhan, VercelHarkaysoft } from '@routes'
import localFont from 'next/font/local'
import { Divider } from '@nextui-org/divider'
const myFont = localFont({ src: './Poppins-SemiBold.ttf' })

export default function Public({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    isLogin().then(setIsLoggedIn)
  }, [])

  const menuItems = useMemo(
    () => ['Ayuda & Feedback', 'Contactar con HarkaySoft'],
    []
  )
  return (
    <main>
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
            <Icon
              icon='material-symbols:store'
              width='28'
              height='28'
              className='text-light-onSurface dark:text-dark-onSurface'
            />
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
              <Icon icon='mdi:arrow-collapse-right' height={22} width={22} />
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
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
                }
                className='w-full'
                href='#'
                size='lg'
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
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
                <Icon
                  icon='material-symbols:store'
                  width='28'
                  height='28'
                  className='text-light-onSurface dark:text-dark-onSurface'
                />
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
                  <Icon icon='mdi:github' width='24' />
                </Link>
              </div>
              <div className='text-light-onSurface dark:text-dark-onSurface hover:text-gray-900 dark:hover:text-white'>
                <Link
                  href={LinkedinJhan}
                  isExternal
                  className='text-light-onSurface dark:text-dark-onSurface'
                >
                  <Icon icon='mdi:linkedin' width='24' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
