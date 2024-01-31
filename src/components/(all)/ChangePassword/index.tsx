'use client'

import React, { FormEvent, useState, useCallback } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { useMutation } from '@apollo/client'
import { Button } from '@nextui-org/button'
import { ChangePassword } from '@lib/graphql/mutation'
import { Input } from '@nextui-org/input'
import { Spinner } from '@nextui-org/spinner'
import { toast } from 'react-hot-toast'
import { FormData } from './types'

const INITIAL_DATA: FormData = {
  oldPassword: '',
  newPassword: ''
}

export default function Home() {
  const [changePassword, { data, loading, error }] = useMutation(ChangePassword)

  const [isVisibleold, setIsVisibleold] = useState(false)
  const toggleVisibilityold = () => setIsVisibleold(!isVisibleold)

  const [status, setStatus] = useState(false)
  const [dataINITIAL, setDataINITIAL] = useState(INITIAL_DATA)

  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const updateFields = useCallback((fields: Partial<FormData>) => {
    setDataINITIAL((prev) => {
      return { ...prev, ...fields }
    })
  }, [])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus(true)
    changePassword({ variables: dataINITIAL })
      .then(() => {
        setStatus(false)
        if (data?.changePassword?.status === false) {
          toast.error('Hubo un error al cambiar de contraseña')
        } else {
          toast.success('Contraseña cambiada exitosamente.')
          setDataINITIAL({ oldPassword: '', newPassword: '' })
          setIsVisibleold(false)
          setIsVisible(false)
        }
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`)
      })
  }

  return (
    <form onSubmit={onSubmit}>
      <Card className='w-auto h-fit'>
        <CardHeader className='text-2xl'>Cambiar contraseña</CardHeader>
        <Divider />
        <CardBody>
          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 flex-col'>
            <label
              htmlFor='password'
              className='block text-xs text-light-onSurface dark:text-dark-onSurface uppercase'
            >
              Contraseña antigua
            </label>
            <Input
              id='oldPassword'
              name='oldPassword'
              size='sm'
              required
              className='lg:w-80'
              value={dataINITIAL.oldPassword}
              placeholder='Escribe tu antigua contraseña'
              onChange={(e) => updateFields({ oldPassword: e.target.value })}
              endContent={
                <Button
                  className='focus:outline-none'
                  variant='light'
                  isIconOnly
                  onClick={toggleVisibilityold}
                >
                  {isVisibleold ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='28'
                      height='28'
                      viewBox='0 0 24 24'
                      className='text-2xl text-default-400 pointer-events-none'
                    >
                      <path
                        fill='currentColor'
                        d='M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='28'
                      height='28'
                      viewBox='0 0 24 24'
                      className='text-2xl text-default-400 pointer-events-none'
                    >
                      <path
                        fill='currentColor'
                        d='M12 17.5c-3.8 0-7.2-2.1-8.8-5.5H1c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5h-2.2c-1.6 3.4-5 5.5-8.8 5.5'
                      />
                    </svg>
                  )}
                </Button>
              }
              type={isVisibleold ? 'text' : 'password'}
            />
          </div>
          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 flex-col'>
            <label
              htmlFor='password'
              className='block text-xs text-light-onSurface dark:text-dark-onSurface uppercase'
            >
              Contraseña nueva
            </label>
            <Input
              id='newPassword'
              name='newPassword'
              size='sm'
              required
              value={dataINITIAL.newPassword}
              className='lg:w-80'
              placeholder='Escribe tu nueva contraseña'
              onChange={(e) => updateFields({ newPassword: e.target.value })}
              endContent={
                <Button
                  className='focus:outline-none'
                  variant='light'
                  isIconOnly
                  onClick={toggleVisibility}
                >
                  {isVisibleold ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='28'
                      height='28'
                      viewBox='0 0 24 24'
                      className='text-2xl text-default-400 pointer-events-none'
                    >
                      <path
                        fill='currentColor'
                        d='M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='28'
                      height='28'
                      viewBox='0 0 24 24'
                      className='text-2xl text-default-400 pointer-events-none'
                    >
                      <path
                        fill='currentColor'
                        d='M12 17.5c-3.8 0-7.2-2.1-8.8-5.5H1c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5h-2.2c-1.6 3.4-5 5.5-8.8 5.5'
                      />
                    </svg>
                  )}
                </Button>
              }
              type={isVisible ? 'text' : 'password'}
            />
          </div>
        </CardBody>
        <CardFooter>
          <Button
            className='bg-light-primary text-light-onPrimary'
            type='submit'
            isDisabled={
              !dataINITIAL.newPassword || !dataINITIAL.oldPassword || status
            }
          >
            {status ? <Spinner /> : 'Cambiar'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
