'use client'

import Form from '@components/Form'
import { Link } from '@nextui-org/link'
import { VercelHarkaysoft } from '@routes'

export default function Login() {
  return (
    <main className='flex flex-col md:flex-row-reverse md:h-screen bg-light-surface dark:bg-dark-surface h-screen'>
      <section className='flex items-start w-full px-4 mx-auto md:px-0 md:items-center md:w-1/3'>
        <div className=' relative md:-left-2 bg-light-surface dark:bg-dark-surface py-5'>
          <Link
            href='/'
            className='w-fit h-14 justify-start items-center gap-[5px] inline-flex lg:pb-10 sm:pb-4'
          >
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
            <div>
              <span className='text-light-onSurface dark:text-dark-onSurface text-2xl font-bold leading-[44px]'>
                qua
              </span>
              <span className='text-light-primary dark:text-dark-primary text-2xl font-bold leading-[44px]'>
                Tu
              </span>
            </div>
          </Link>
          <div className='md:flex items-start'>
            <section className='w-fit h-8 justify-start items-center gap-[5px] inline-flex'>
              <span className='self-center whitespace-nowrapont-semibold dark:text-white'>
                by{' '}
              </span>
              <Link
                href={VercelHarkaysoft}
                className='hover:underline text-light-shadow dark:text-dark-shadow '
                showAnchorIcon
                isExternal
              >
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
            </section>
          </div>
        </div>
      </section>
      <section className='justify-center px-4 md:px-0 md:flex md:w-2/3 md:border-r'>
        <div className='w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12'>
          <h2 className='text-xl font-semibold md:text-2xl text-light-onSurface dark:text-dark-onSurface'>
            Ingresar
          </h2>
          <p className='text-sm text-light-onSurface dark:text-dark-onSurface pb-2'>
            Usa tu nombre de usuario y contraseña para ingresar.
          </p>

          <Form type='login' />
        </div>
      </section>
    </main>
  )
}
