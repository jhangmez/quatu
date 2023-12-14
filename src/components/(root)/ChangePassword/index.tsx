'use client'

import React, { FormEvent, useState, useCallback } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@nextui-org/button'
import { RootChangePassword } from '@lib/graphql/mutation'
import { Input } from '@nextui-org/input'
import { Icon } from '@iconify/react'
import { toast } from 'react-hot-toast'
import { FormData } from './types'
import { Select, SelectSection, SelectItem } from '@nextui-org/select'
import { AllUsers, AllTypeUsers } from '@lib/graphql/query'
import { Spinner } from '@nextui-org/spinner'

const INITIAL_DATA: FormData = {
  idUser: 0,
  newPassword: ''
}

export default function Home() {
  const [rootChangePassword, { data, loading, error }] =
    useMutation(RootChangePassword)
  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
    refetch: usersRefetch
  } = useQuery(AllUsers)
  const {
    loading: typeUsersLoading,
    error: typeUsersError,
    data: typeUsersData,
    refetch
  } = useQuery(AllTypeUsers)

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
    rootChangePassword({ variables: dataINITIAL })
      .then(() => {
        setStatus(false)
        if (data?.rootchangePassword?.status === false) {
          toast.error('Hubo un error al cambiar de contraseña')
        } else {
          toast.success(
            `Contraseña cambiada del usuario : ${dataINITIAL.idUser} exitosamente.`
          )
          setDataINITIAL({ idUser: 0, newPassword: '' })
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
        <CardHeader className='text-2xl'>
          Cambiar contraseña a usuario
        </CardHeader>
        <Divider />
        <CardBody>
          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 flex-col'>
            <label
              htmlFor='password'
              className='block text-xs text-light-onSurface dark:text-dark-onSurface uppercase'
            >
              Seleccionar usuario
            </label>
            <Select
              isRequired
              placeholder='Seleccione el usuario'
              className='lg:w-80'
              // defaultSelectedKeys={[dataINITIAL.idUser]}
              items={
                (Array.isArray(usersData?.allUsers)
                  ? usersData.allUsers
                  : []) ?? []
              }
              onChange={(e) => {
                updateFields({ idUser: Number(e.target.value) })
              }}
            >
              {(typeUsersData?.allTypeUser ?? []).map(
                (typeUser, index, array) => (
                  <SelectSection
                    showDivider={index !== array.length - 1}
                    title={typeUser.name}
                  >
                    {(usersData?.allUsers ?? [])
                      .filter((user) => user.typeuser?.id === typeUser.id)
                      .map((user) => (
                        <SelectItem key={user.id}>{user.name}</SelectItem>
                      ))}
                  </SelectSection>
                )
              )}
            </Select>
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
            isDisabled={
              !dataINITIAL.newPassword || !dataINITIAL.idUser || status
            }
          >
            {status ? <Spinner /> : 'Cambiar'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
