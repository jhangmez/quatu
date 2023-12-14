'use client'

import React, { FormEvent, useState, useCallback } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { useMutation } from '@apollo/client'
import { Button } from '@nextui-org/button'
import { ChangePassword } from '@lib/graphql/mutation'
import { Input } from '@nextui-org/input'
import { Icon } from '@iconify/react'
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
                    <Icon
                      icon='mdi:eye'
                      width='28'
                      height='28'
                      className='text-2xl text-default-400 pointer-events-none'
                    />
                  ) : (
                    <Icon
                      icon='mdi:eye-closed'
                      width='28'
                      height='28'
                      className='text-2xl text-default-400 pointer-events-none'
                    />
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
                  {isVisible ? (
                    <Icon
                      icon='mdi:eye'
                      width='28'
                      height='28'
                      className='text-2xl text-default-400 pointer-events-none'
                    />
                  ) : (
                    <Icon
                      icon='mdi:eye-closed'
                      width='28'
                      height='28'
                      className='text-2xl text-default-400 pointer-events-none'
                    />
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
            isDisabled={!dataINITIAL.newPassword || !dataINITIAL.oldPassword}
          >
            Cambiar
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
