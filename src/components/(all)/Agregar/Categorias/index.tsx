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

import { useDropzone } from '@uploadthing/react'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { useUploadThing } from '@utils/uploadthing'

const INITIAL_DATA: FormData = {
  name: '',
  visible: false,
  link: ''
}

export default function Categorias() {
  const [createCategory] = useMutation(CreateCategory, {
    refetchQueries: ['AllCategoriesByCompany']
  })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [status, setStatus] = useState(false)
  const [dataINITIAL, setDataINITIAL] = useState(INITIAL_DATA)

  const updateFields = useCallback((fields: Partial<FormData>) => {
    setDataINITIAL((prev) => {
      return { ...prev, ...fields }
    })
  }, [])

  const [files, setFiles] = useState<File[]>([])
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { startUpload, permittedFileInfo } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      toast.success('uploaded successfully!')
      let firstFileUrl = res[0].url
      updateFields({ link: firstFileUrl })
    },
    onUploadError: (error) => {
      toast.error(error.message)
    },
    onUploadBegin: () => {
      toast('Comenzado a subir.', {
        icon: '⏳'
      })
    }
  })

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : []

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined
  })

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus(true)
    toast
      .promise(createCategory({ variables: dataINITIAL }), {
        loading: 'Creando categoría...',
        success: 'Categoría creada exitosamente.',
        error: (err) => `Error: ${err.message}`
      })
      .then(() => {
        setStatus(false)
        setDataINITIAL(INITIAL_DATA)
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`)
      })
  }

  return (
    <>
      <Button
        endContent={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path fill='currentColor' d='M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z' />
          </svg>
        }
        onPress={() => {
          onOpen()
          setDataINITIAL(INITIAL_DATA)
        }}
        className='bg-light-primary text-light-onPrimary'
      >
        Agregar Categoría
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
                  Agregar Categoría
                </ModalHeader>
                <ModalBody>
                  <Input
                    id='name'
                    name='name'
                    autoFocus
                    label='Categoría'
                    isRequired
                    placeholder='Nombre de la categoría'
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

                  <div
                    {...getRootProps()}
                    className='h-32 rounded-xl bg-light-primaryContainer max-w-full gap-3 max-h-full flex flex-col-reverse items-center justify-center'
                  >
                    <input {...getInputProps()} />
                    <div>
                      {files.length > 0 && (
                        <Button
                          className='bg-light-secondary text-light-onSecondary'
                          onClick={() => startUpload(files)}
                        >
                          Subir {files.length} archivo
                        </Button>
                      )}
                    </div>
                    Suelta o selecciona el archivo aquí!
                    <span className='text-light-error'>*</span>
                  </div>
                  <p className='text-sm'>Subir primero la imagen</p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className='bg-light-error/30 text-light-error font-semibold'
                    onPress={() => {
                      onClose()
                      setDataINITIAL(INITIAL_DATA)
                    }}
                  >
                    Cerrar
                  </Button>
                  <Button
                    className='bg-light-primary text-light-onPrimary'
                    type='submit'
                    onPress={() => {
                      onClose()
                      setDataINITIAL(INITIAL_DATA)
                    }}
                    isDisabled={
                      !dataINITIAL.name || status || !dataINITIAL.link
                    }
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
