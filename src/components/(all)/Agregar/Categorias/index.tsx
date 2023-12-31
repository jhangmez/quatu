'use client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Checkbox } from '@nextui-org/checkbox'
import { FormData } from './types'
import { toast } from 'react-hot-toast'
import React, { FormEvent, useState, useCallback } from 'react'
import { CreateCategory } from '@lib/graphql/mutation'
import { useMutation } from '@apollo/client'
import { Spinner } from '@nextui-org/spinner'

const INITIAL_DATA: FormData = {
  name: '',
  visible: false
}

export default function Categorias() {
  const [createCategory, { data: dataCreate, loading, error }] = useMutation(
    CreateCategory,
    {
      refetchQueries: ['AllCategoriesByCompany']
      //VERIFICAR QUE ESTO SEA LUEGO POR CACHE PARA EVITAR QUE SE ACTUALICEN TODOS LOS DATOS NUEVAMENTE
      // update(cache, { data }) {
      //   cache.modify({
      //     fields: {
      //       categories(existingCategories = []) {
      //         const newCategoryRef = cache.writeFragment({
      //           data: data?.createCategory,
      //           fragment: gql`
      //             fragment NewCategory on Category {
      //               id
      //               name
      //               visible
      //             }
      //           `
      //         })
      //         return [...existingCategories, newCategoryRef]
      //       }
      //     }
      //   })
      // }
    }
  )

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [status, setStatus] = useState(false)
  const [dataINITIAL, setDataINITIAL] = useState(INITIAL_DATA)

  const updateFields = useCallback((fields: Partial<FormData>) => {
    setDataINITIAL((prev) => {
      return { ...prev, ...fields }
    })
  }, [])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus(true)
    createCategory({ variables: dataINITIAL })
      .then(() => {
        setStatus(false)
        toast.success('Categoria creada exitosamente.')
        setDataINITIAL({ name: '', visible: false })
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`)
      })
  }

  return (
    <>
      <Button
        onPress={onOpen}
        className='bg-light-primary text-light-onPrimary'
      >
        Agregar Categoria
      </Button>
      <Modal
        placement='center'
        backdrop='opaque'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <form onSubmit={onSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  Agregar Categoria
                </ModalHeader>
                <ModalBody>
                  <Input
                    id='name'
                    name='name'
                    autoFocus
                    label='Categoria'
                    isRequired
                    placeholder='Nombre de la categoria'
                    value={dataINITIAL.name}
                    variant='bordered'
                    onChange={(e) => updateFields({ name: e.target.value })}
                  />
                  <Checkbox
                    isSelected={dataINITIAL.visible}
                    onChange={(e) =>
                      updateFields({ visible: e.target.checked })
                    }
                  >
                    Visible
                  </Checkbox>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className='bg-light-error/30 text-light-error font-semibold'
                    onPress={onClose}
                  >
                    Cerrar
                  </Button>
                  <Button
                    className='bg-light-primary text-light-onPrimary'
                    type='submit'
                    onPress={onClose}
                    isDisabled={!dataINITIAL.name || status}
                  >
                    {status ? <Spinner /> : 'Agregar'}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}
