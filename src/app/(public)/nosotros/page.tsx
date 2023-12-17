'use client'

import Form from '@components/Form'
import { Link } from '@nextui-org/link'
import { Icon } from '@iconify/react'
import { VercelHarkaysoft } from '@routes'

export default function Precios() {
  return (
    <main className='flex flex-col md:flex-row-reverse md:h-screen bg-light-surface dark:bg-dark-surface h-screen'>
      <section className='flex items-start w-full px-4 mx-auto md:px-0 md:items-center md:w-1/3'>
        <div className=' relative md:-left-2 bg-light-surface dark:bg-dark-surface py-5'>
          <Link
            href='/'
            className='w-fit h-14 justify-start items-center gap-[5px] inline-flex lg:pb-10 sm:pb-4'
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
          <div className='md:flex items-start'>
            <section className='w-fit h-8 justify-start items-center gap-[5px] inline-flex'>
              <span className='self-center whitespace-nowrapont-semibold dark:text-white'>
                by{' '}
              </span>
              <Link
                href={VercelHarkaysoft}
                className='hover:underline'
                target='_blank'
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
            NOSOTROOOOOOOOOOOOOOOOOOOOOOOS
          </h2>
        </div>
      </section>
    </main>
  )
}
