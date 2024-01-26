'use client'

import { Link } from '@nextui-org/link'
import { Card } from '@nextui-org/card'
import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'

export default function Precios() {
  return (
    <main className='flex items-center justify-center overflow-auto bg-light-surface dark:bg-dark-surface    '>
      <section className='relative isolate w-full max-w-6xl px-6 py-14 lg:px-8'>
        <div>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-light-secondary dark:text-dark-secondary sm:text-6xl'>
              Presenta tu negocio al mundo de manera <br></br>
              <span className='text-light-primary dark:text-dark-primary'>
                fácil, rápida y económica.
              </span>
            </h1>
            <p className='mt-6 text-lg leading-8 text-muted-foreground text-light-secondary dark:text-dark-secondary'>
              Olvídate de comprar páginas caras, antiguas y difíciles de usar;
              <span className='text-light-primary dark:text-dark-tertiary'>
                {' '}
                nosotros te simplificamos todo.
              </span>
            </p>
          </div>
          <div className='mt-10 flex flex-col gap-y-6 sm:gap-x-6 lg:flex-row'>
            <Card className='ring-1 ring-gray-200 flex dark:bg-light-surface w-full flex-col justify-between rounded-3xl bg-white p-8 shadow-lg lg:w-1/3 xl:p-10'>
              <div className='flex items-center justify-between gap-x-4'>
                <h1
                  id='free'
                  className='text-gray-900 text-2xl font-semibold leading-8'
                >
                  Bodega
                </h1>
              </div>
              <p className='mt-4 min-h-[3rem] text-sm leading-6 text-gray-600'>
                Ideal para comenzar y gestionar tu proyecto con eficacia.
              </p>
              <p className='mt-6 flex items-baseline gap-x-1'>
                <span className='text-4xl font-bold tracking-tight text-gray-900'>
                  $4
                </span>
                <span className='text-sm font-semibold leading-6 text-gray-600'>
                  /mes
                </span>
              </p>
              <Button
                as={Link}
                href='/demo'
                className='bg-light-primaryContainer text-light-primary ring-1 ring-inset ring-light-tertiary-200 hover:ring-light-tertiary-300 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline focus-visible:outline-light-primary'
              >
                Solicitar demo
              </Button>
              <div className='flex grow flex-col justify-between'>
                <ul
                  role='list'
                  className='mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10'
                >
                  <li className='flex gap-x-3'>
                    <Icon
                      icon='material-symbols:check'
                      className='h-6 w-5 flex-none text-light-primary'
                    />
                    200 MB de almacenamiento
                  </li>
                  <li className='flex gap-x-3'>
                    <Icon
                      icon='material-symbols:check'
                      className='h-6 w-5 flex-none text-light-primary'
                    />
                    1 administrador
                  </li>
                  <li className='flex gap-x-3'>
                    <Icon
                      icon='material-symbols:check'
                      className='h-6 w-5 flex-none text-light-primary'
                    />
                    Todas las herramientas de quaTu
                  </li>
                </ul>
                <ul className='mt-6'>
                  <li className='flex gap-x-3 text-xs text-gray-600'>
                    * No incluye dominio personalizado
                  </li>
                </ul>
              </div>
            </Card>
            <Card className='ring-2 ring-light-primary dark:bg-light-surface flex w-full flex-col justify-between rounded-3xl bg-white p-8 shadow-lg lg:w-1/3 xl:p-10'>
              <div className='flex items-center justify-between gap-x-4'>
                <h1
                  id='paid'
                  className='text-light-primary text-2xl font-semibold leading-8'
                >
                  Tienda
                </h1>
                <p className='flex flex-row items-center rounded-full bg-light-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-light-primary'>
                  <Icon icon='ic:round-star' /> quaTu
                </p>
              </div>
              <p className='mt-4 min-h-[3rem] text-sm leading-6 text-gray-600'>
                Perfecto para expandir tu equipo y dar un impulso a la
                productividad.
              </p>
              <p className='mt-6 flex items-baseline gap-x-1'>
                <span className='text-4xl font-bold tracking-tight text-gray-900'>
                  $8
                </span>
                <span className='text-sm font-semibold leading-6 text-gray-600'>
                  /mes
                </span>
              </p>
              <Button
                as={Link}
                href='/demo'
                className='bg-light-primary text-light-onPrimary ring-1 ring-inset ring-light-tertiary-200 hover:ring-light-tertiary-300 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline focus-visible:outline-light-primary'
              >
                Solicitar demo
              </Button>
              <div className='flex grow flex-col justify-between'>
                <ul
                  role='list'
                  className='mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10'
                >
                  <li className='flex gap-x-3'>
                    <Icon
                      icon='material-symbols:check'
                      className='h-6 w-5 flex-none text-light-primary'
                    />
                    600 MB de almacenamiento
                  </li>
                  <li className='flex gap-x-3'>
                    <Icon
                      icon='material-symbols:check'
                      className='h-6 w-5 flex-none text-light-primary'
                    />
                    1 administrador + 1 trabajador
                  </li>
                  <li className='flex gap-x-3'>
                    <Icon
                      icon='material-symbols:check'
                      className='h-6 w-5 flex-none text-light-primary'
                    />
                    Todas las herramientas de quaTu
                  </li>
                  <li className='flex gap-x-3'>
                    <Icon
                      icon='material-symbols:check'
                      className='h-6 w-5 flex-none text-light-primary'
                    />
                    Atención personalizada
                  </li>
                </ul>
                <ul className='mt-6'>
                  <li className='flex gap-x-3 text-xs text-gray-600'>
                    * No incluye dominio personalizado
                  </li>
                </ul>
              </div>
            </Card>
            <Card className='ring-1 ring-gray-200 flex dark:bg-light-surface w-full flex-col justify-between rounded-3xl bg-white p-8 shadow-lg lg:w-1/3 xl:p-10'>
              <div className='flex items-center justify-between gap-x-4'>
                <h1
                  id='custom'
                  className='text-gray-900 text-2xl font-semibold leading-8'
                >
                  Empresa
                </h1>
              </div>
              <p className='mt-4 min-h-[3rem] text-sm leading-6 text-gray-600'>
                La solución completa para llevar tu proyecto al siguiente nivel.
              </p>
              <p className='mt-6 flex items-baseline gap-x-1'>
                <span className='text-4xl font-bold tracking-tight text-gray-900'>
                  $11
                </span>
                <span className='text-sm font-semibold leading-6 text-gray-600'>
                  /mes
                </span>
              </p>
              <Button
                as={Link}
                href='/demo'
                className='bg-light-primaryContainer text-light-primary ring-1 ring-inset ring-light-tertiary-200 hover:ring-light-tertiary-300 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline focus-visible:outline-light-primary'
              >
                Solicitar demo
              </Button>
              <div className='flex grow flex-col justify-between'>
                <ul
                  role='list'
                  className='mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10'
                >
                  <li className='flex gap-x-3'>
                    <Icon
                      icon='material-symbols:check'
                      className='h-6 w-5 flex-none text-light-primary'
                    />
                    1 GB de almacenamiento
                  </li>
                  <li className='flex gap-x-3'>
                    <Icon
                      icon='material-symbols:check'
                      className='h-6 w-5 flex-none text-light-primary'
                    />
                    2 administradores + 3 trabajadores
                  </li>
                  <li className='flex gap-x-3'>
                    <Icon
                      icon='material-symbols:check'
                      className='h-6 w-5 flex-none text-light-primary'
                    />
                    Todas las herramientas de quaTu
                  </li>
                  <li className='flex gap-x-3'>
                    <Icon
                      icon='material-symbols:check'
                      className='h-6 w-5 flex-none text-light-primary'
                    />
                    Atención personalizada
                  </li>
                </ul>
                <ul className='mt-6'>
                  <li className='flex gap-x-3 text-xs text-gray-600'>
                    * No incluye dominio personalizado
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
