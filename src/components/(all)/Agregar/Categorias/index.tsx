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
import {
  UploadButton,
  UploadDropzone,
  useUploadThing
} from '@utils/uploadthing'

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

  // const { startUpload } = useUploadThing('imageUploader', {
  //   onClientUploadComplete: (res) => {
  //     console.log('Upload Completed')
  //     // let uploadedFileUrls = res.map((file) => file.url).join(', ')
  //     // toast.success(`Successfully uploaded! File URLs: ${uploadedFileUrls}`)
  //     // toast.success('Archivo subido correctamente!')
  //     let firstFileUrl = res[0].url
  //     updateFields({ link: firstFileUrl })
  //     console.log('Se subio correctamente la imagen')
  //   }
  // })

  const { startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      console.log('Upload Completed')
      let firstFileUrl = res[0].url
      updateFields({ link: firstFileUrl })
      console.log(`Se subió correctamente la imagen:${firstFileUrl}`)
    }
  })

  const updateFields = useCallback((fields: Partial<FormData>) => {
    setDataINITIAL((prev) => {
      return { ...prev, ...fields }
    })
  }, [])

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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
        // onPress={onOpen}
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
                  <UploadDropzone
                    endpoint='imageUploader'
                    className='bg-light-primaryContainer ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300'
                    content={{
                      button({ ready, isUploading }) {
                        const buttonClasses = `custom-button ${
                          ready
                            ? 'custom-button-ready'
                            : 'custom-button-not-ready'
                        } ${
                          isUploading ? 'custom-button-uploadin text-white' : ''
                        }`

                        return (
                          <div className={buttonClasses}>
                            {ready ? 'Subir archivos' : 'Preparando subida...'}
                          </div>
                        )
                      },
                      label: () => (
                        <span className='text-light-onSurface'>
                          Seleccione la imagen o arrástrela y suéltela
                        </span>
                      ),
                      allowedContent({ ready, fileTypes, isUploading }) {
                        if (!ready) return 'Verificando'
                        if (isUploading) return 'Subiendo imagen...'
                        return `Tipo de archivo que puedes subir: ${fileTypes.join(
                          ', '
                        )}`
                      }
                    }}
                    onUploadBegin={() => {
                      toast('Comenzado a subir.', {
                        icon: '⏳'
                      })
                    }}
                    onClientUploadComplete={(res) => {
                      console.log(`onClientUploadComplete`, res.map)
                      let uploadedFileUrls = res
                        .map((file) => file.url)
                        .join(', ')
                      toast.success(
                        `Successfully uploaded! File URLs: ${uploadedFileUrls}`
                      )
                      toast.success('Archivo subido correctamente!')
                      let firstFileUrl = res[0].url
                      updateFields({ link: firstFileUrl })
                      console.log('Se subio correctamente la imagen')
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(`ERROR! ${error.message}`)
                    }}
                  />
                  {/* <Input
                    type='file'
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return

                      // Do something with files

                      // Then start the upload
                      await startUpload([file])
                      toast.promise(startUpload([file]), {
                        loading: 'Subiendo archivo...',
                        success: <b>¡Subida completa!</b>,
                        error: <b>No se pudo subir el archivo.</b>
                      })
                    }}
                  />*/}
                  {/* <Input
                    type='file'
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setSelectedFile(file)
                        console.log('Archivo seleccionado:', file)
                      } else {
                        console.log('No se seleccionó ningún archivo.')
                      }
                    }}
                  /> */}
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
