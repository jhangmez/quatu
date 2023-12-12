'use client'

import { useState } from 'react'
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
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/dropdown'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    'Categorías',
    'Ayuda & Feedback',
    'Contactar con HarkaySoft'
  ]
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
          <Icon
            icon='material-symbols:store'
            width='28'
            height='28'
            className='text-light-onSurface dark:text-dark-onSurface'
          />
          <span className='text-light-onSurface dark:text-dark-onSurface text-2xl font-bold leading-[44px]'>
            tu
          </span>
          <span className='text-light-primary dark:text-dark-primary text-2xl font-bold leading-[44px]'>
            Ti
          </span>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <Dropdown>
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
            aria-label='ACME features'
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
        </Dropdown>

        <NavbarItem isActive>
          <Link
            href='#'
            aria-current='page'
            className='text-light-primary dark:text-dark-primary'
          >
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href='#'
            className='text-light-onSurface dark:text-dark-onSurface'
          >
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link
            className='text-light-primary dark:text-dark-primary'
            href='/login'
          >
            Ingresar
          </Link>
        </NavbarItem>
        <NavbarItem className='flex lg:hidden'>
          <Link
            className='text-light-primary dark:text-dark-primary'
            href='/login'
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
  )
}
