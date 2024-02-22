'use client'

import { useState, useContext } from 'react'
import { UserContext } from '@utils/userContext'
import { Link } from '@nextui-org/link'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/dropdown'
import { listadomenu, dropdownItems } from '@utils/listMenu'
import { Skeleton } from '@nextui-org/skeleton'
import { User } from '@nextui-org/user'
import { Listbox, ListboxItem } from '@nextui-org/listbox'

export default function Aside() {
  const { loading, error, data, refetch } = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <aside className='flex h-screen lg:w-2/12 md:w-4/12 w-1/12 flex-col items-center border-r border-gray-200 bg-light-surface dark:bg-dark-surface text-light-onSurface dark:text-dark-onSurface lg:flex md:flex hidden'>
      <div className='flex h-[4.5rem] w-full items-center justify-center border-b border-gray-200 p-2'>
        <section className='w-fit h-14 justify-start items-center inline-flex'>
          <Link className='hover:underline' href='/home'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='28'
              height='28'
              viewBox='0 0 24 24'
              className='text-light-primary dark:text-dark-primary'
            >
              <g fill='none' fill-rule='evenodd'>
                <path d='M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z' />
                <path
                  fill='currentColor'
                  d='M17.5 3a2 2 0 0 1 1.6.8l2.688 3.584a.995.995 0 0 1 .204.616H22v1a3.99 3.99 0 0 1-1 2.646V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7.354A3.985 3.985 0 0 1 2 9V8h.008a.995.995 0 0 1 .204-.616L4.9 3.8A2 2 0 0 1 6.5 3zM15 11.646A3.99 3.99 0 0 1 12 13a3.99 3.99 0 0 1-3-1.354a3.99 3.99 0 0 1-3.757 1.282L5 12.874V19h14v-6.126l-.243.054A3.99 3.99 0 0 1 15 11.645ZM20 9h-4a2 2 0 0 0 3.995.15zm-6 0h-4a2 2 0 0 0 3.995.15zM8 9H4a2 2 0 0 0 3.995.15zm9.5-4h-11L5 7h14z'
                />
              </g>
            </svg>
            <span className='text-light-onSurface dark:text-dark-onSurface text-2xl font-bold leading-[44px]'>
              qua
            </span>
            <span className='text-light-primary dark:text-dark-primary text-2xl font-bold leading-[44px]'>
              Tu
            </span>
          </Link>
        </section>
      </div>

      <Listbox
        className='flex flex-1 flex-col gap-y-4 pt-2 bg-transparent'
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
            startContent={
              submenu.icon ? (
                <div dangerouslySetInnerHTML={{ __html: submenu.icon }} />
              ) : null
            }
          >
            {submenu.label}
          </ListboxItem>
        ))}
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
          <Listbox
            className='flex flex-col items-center gap-y-4'
            aria-label='Listado de opciones'
          >
            <ListboxItem key='user' aria-label='listado de opciones v2'>
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
                    aria-label='usuario'
                    avatarProps={{
                      src: '/user_picture.webp'
                    }}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label='Static Actions'>
                  {dropdownItems.map((item) => (
                    <DropdownItem
                      key={String(item.key)}
                      aria-label={String(item.ariaLabel)}
                      as={Link}
                      href={item.href}
                      className={item.className}
                      onPress={item.onPress}
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </ListboxItem>
          </Listbox>
        </>
      )}
    </aside>
  )
}
