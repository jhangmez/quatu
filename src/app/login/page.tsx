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
