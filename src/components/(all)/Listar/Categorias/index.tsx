'use client'
import React, { useCallback, FormEvent, useState, Key, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { AllCategoriesByCompany, GetCategoryId } from '@lib/graphql/query'
import { Input } from '@nextui-org/input'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/table'
import { Pagination } from '@nextui-org/pagination'
import { Tooltip } from '@nextui-org/tooltip'
import { Chip, ChipProps } from '@nextui-org/chip'
import { CircularProgress } from '@nextui-org/progress'
import { Skeleton } from '@nextui-org/skeleton'
import { Button } from '@nextui-org/react'
import { toast } from 'react-hot-toast'
import { DeleteCategory, UpdateCategory } from '@lib/graphql/mutation'
import { useMutation } from '@apollo/client'
import { Checkbox } from '@nextui-org/checkbox'
import { FormData } from './types'
import NextImage from 'next/image'
import { Image } from '@nextui-org/image'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter
} from '@nextui-org/modal'
import { Spinner } from '@nextui-org/spinner'
import { Link } from '@nextui-org/link'

const statusColorMap: Record<string, ChipProps['color']> = {
  true: 'success',
  false: 'danger'
}

const columns = [
  {
    key: 'name',
    label: 'NOMBRE'
  },
  {
    key: 'linkImageCategory',
    label: 'IMAGEN'
  },
  {
    key: 'visible',
    label: 'ESTADO'
  },
  {
    key: 'actions',
    label: 'ACCIONES'
  }
]

interface Category {
  id: number
  name: string
  visible: boolean
  linkImageCategory: {
    link: string
  }
}

const INITIAL_DATA: FormData = {
  name: '',
  link: '',
  visible: false
}

export default function Categorias() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  )
  const [dataINITIAL, setDataINITIAL] = useState(INITIAL_DATA)

  const [deleteCategory] = useMutation(DeleteCategory, {
    refetchQueries: ['AllCategoriesByCompany']
  })

  const [updateCategory] = useMutation(UpdateCategory, {
    refetchQueries: ['AllCategoriesByCompany']
  })

  const updateFields = useCallback((fields: Partial<FormData>) => {
    setDataINITIAL((prev) => {
      return { ...prev, ...fields }
    })
  }, [])

  const {
    loading: loadingGet,
    error: errorGet,
    data: dataGet,
    refetch: refGet
  } = useQuery(GetCategoryId, {
    variables: { getCategoryId: Number(selectedCategoryId) }
  })

  const { loading, error, data, refetch } = useQuery(AllCategoriesByCompany)
  const [inputValue, setInputValue] = useState('')
  const [status, setStatus] = useState(false)

  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const pages = Math.ceil(
    (data?.allCategoriesByCompany?.length || 0) / rowsPerPage
  )

  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onOpenChange: onDetailOpenChange
  } = useDisclosure()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange
  } = useDisclosure()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange
  } = useDisclosure()

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return data?.allCategoriesByCompany.slice(start, end)
  }, [page, data])

  const renderCell = useCallback((category: any, columnKey: Key) => {
    const cellValue = category[columnKey as keyof typeof category]

    switch (columnKey) {
      case 'name':
        return cellValue
      case 'linkImageCategory':
        return (
          <Chip
            className='capitalize select-none'
            color={cellValue ? statusColorMap['true'] : statusColorMap['false']}
            size='sm'
            variant='flat'
            as={Link}
            href={
              typeof cellValue === 'object' && cellValue !== null
                ? cellValue.link || ''
                : ''
            }
            isDisabled={!cellValue}
            isExternal={!!cellValue}
          >
            {cellValue ? 'Ver imagen' : 'No existe'}
          </Chip>
        )
      case 'visible':
        return (
          <Chip
            className='capitalize select-none'
            color={cellValue ? statusColorMap['true'] : statusColorMap['false']}
            size='sm'
            variant='flat'
          >
            {cellValue ? 'Visible' : 'No visible'}
          </Chip>
        )
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <div className='relative flex items-center gap-2'>
              <Tooltip content='Detalle'>
                <Button
                  isIconOnly
                  variant='light'
                  size='sm'
                  // onPress={onDetailOpen}
                  onPress={() => {
                    onDetailOpen()
                    setSelectedCategoryId(category.id)
                  }}
                >
                  <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5'
                      />
                    </svg>
                  </span>
                </Button>
              </Tooltip>
              <Tooltip content='Editar'>
                <Button
                  isIconOnly
                  variant='light'
                  size='sm'
                  onPress={() => {
                    updateFields({
                      name: category.name,
                      link: category.linkImageCategory?.link,
                      visible: category.visible
                    })
                    onEditOpen()
                    setSelectedCategoryId(category.id)
                  }}
                >
                  <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z'
                      />
                    </svg>
                  </span>
                </Button>
              </Tooltip>
              <Tooltip color='danger' content='Borrar'>
                <Button
                  isIconOnly
                  variant='light'
                  size='sm'
                  onPress={() => {
                    onDeleteOpen()
                    setSelectedCategoryId(category.id)
                    setInputValue('')
                  }}
                >
                  <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z'
                      />
                    </svg>
                  </span>
                </Button>
              </Tooltip>
            </div>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  function onSubmitDelete(e: FormEvent) {
    e.preventDefault()
    setStatus(true)
    toast
      .promise(
        deleteCategory({ variables: { id: Number(selectedCategoryId) } }),
        {
          loading: `Borrando categoría ${dataGet?.getCategory?.name}...`,
          success: `Categoría ${dataGet?.getCategory?.name} borrada exitosamente.`,
          error: (err) => `Error: ${err.message}`
        }
      )
      .then(() => {
        setStatus(false)
      })
      .catch(() => {
        console.log('Hubo error')
      })
  }

  function onSubmitEdit(e: FormEvent) {
    e.preventDefault()
    setStatus(true)
    toast
      .promise(
        updateCategory({
          variables: {
            id: Number(selectedCategoryId),
            name: dataINITIAL.name,
            visible: dataINITIAL.visible
          }
        }),
        {
          loading: `Modificando categoria categoría ${dataGet?.getCategory?.name}...`,
          success: `Categoría modificada exitosamente.`,
          error: (err) => `Error: ${err.message}`
        }
      )
      .then(() => {
        setStatus(false)
      })
      .catch(() => {
        console.log('Hubo error')
      })
  }

  return (
    <>
      <Table
        aria-label='Tabla'
        bottomContent={
          <>
            {loading ? (
              <div className='h-full w-full flex items-center justify-center'>
                <Skeleton className='w-2/5 rounded-lg'>
                  <div className='h-10 w-2/5 rounded-lg bg-default-200'></div>
                </Skeleton>
              </div>
            ) : error ? (
              <p className='text-light-onSurface dark:text-dark-onSurface'>
                Error {error.message}
              </p>
            ) : (
              <div className='flex w-full justify-center'>
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color='primary'
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                  classNames={{
                    item: 'text-light-secondary',
                    cursor: 'text-light-onPrimary'
                  }}
                />
              </div>
            )}
          </>
        }
        classNames={{
          wrapper: 'min-h-[222px]'
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              className='text-light-onPrimaryContainer'
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items ?? []}
          emptyContent={
            <>
              {loading ? (
                <div className='h-full w-full flex items-center justify-center'>
                  <CircularProgress
                    aria-label='Loading...'
                    label='Cargando...'
                  />
                </div>
              ) : error ? (
                <p className='text-light-onSurface dark:text-dark-onSurface'>
                  Error {error.message}
                </p>
              ) : (
                'No existe data.'
              )}
            </>
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        placement='center'
        isOpen={isDetailOpen}
        onOpenChange={onDetailOpenChange}
        isDismissable={false}
        backdrop='opaque'
        size='5xl'
      >
        <ModalContent>
          {(onClose) => (
            <>
              {errorGet ? (
                'Error'
              ) : loadingGet ? (
                <section className='flex h-72 justify-center items-center'>
                  <Spinner />
                </section>
              ) : (
                <>
                  <ModalHeader className='flex flex-col gap-1'>
                    Visualizar categoría: {dataGet?.getCategory?.name}
                  </ModalHeader>
                  <ModalBody>
                    {dataGet?.getCategory?.id}
                    {dataGet?.getCategory?.linkImageCategory?.link ? (
                      <Image
                        as={NextImage}
                        width={150}
                        height={150}
                        src={dataGet?.getCategory?.linkImageCategory?.link}
                        fallbackSrc='/loadingImage.webp'
                        alt='Imagen de la categoria'
                      />
                    ) : (
                      <Image
                        width={150}
                        height={150}
                        alt='No existe Imagen'
                        className='bg-opacity-50'
                        src='/noImage.webp'
                      />
                    )}
                    <p>
                      Aca se podra visualizar a detalle el contenido de la
                      categoria: {dataGet?.getCategory?.name}
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color='danger' variant='light' onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button
                      className='bg-light-primary text-light-onPrimary'
                      onPress={onClose}
                    >
                      Realizar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        placement='center'
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        isDismissable={false}
        backdrop='opaque'
      >
        <form onSubmit={onSubmitEdit}>
          <ModalContent>
            {(onClose) => (
              <>
                {errorGet ? (
                  'Error'
                ) : loadingGet ? (
                  <section className='flex h-72 justify-center items-center'>
                    <Spinner />
                  </section>
                ) : (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>
                      Editar categoría:{' '}
                      {errorGet
                        ? 'Error'
                        : loadingGet
                        ? '...'
                        : dataGet?.getCategory?.name}
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
                      <Input
                        id='link'
                        name='link'
                        autoFocus
                        label='Link de la imagen'
                        isRequired
                        placeholder='Link de la imagen'
                        value={dataINITIAL.link}
                        variant='bordered'
                        onChange={(e) => updateFields({ link: e.target.value })}
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
                      <Button color='danger' variant='light' onPress={onClose}>
                        Cerrar
                      </Button>
                      <Button
                        className='bg-light-primary text-light-onPrimary'
                        onPress={onClose}
                        type='submit'
                      >
                        Editar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
      <Modal
        placement='center'
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        backdrop='opaque'
      >
        <form onSubmit={onSubmitDelete}>
          <ModalContent>
            {(onClose) => (
              <>
                {errorGet ? (
                  'Error'
                ) : loadingGet ? (
                  <section className='flex h-72 justify-center items-center'>
                    <Spinner />
                  </section>
                ) : (
                  <>
                    <ModalHeader className='flex flex-col gap-1 text-light-error'>
                      Eliminar categoría: {dataGet?.getCategory?.name}
                    </ModalHeader>
                    <ModalBody>
                      <p className='text-sm select-none'>
                        Escriba{' '}
                        <span className='italic font-medium'>
                          Borrar {dataGet?.getCategory?.name}
                        </span>
                      </p>
                      <Input
                        isRequired
                        className='max-w-xs'
                        label={
                          <>
                            Escriba{' '}
                            <span className='italic font-medium'>
                              &#34;Borrar {dataGet?.getCategory?.name}
                              &#34;
                            </span>
                          </>
                        }
                        value={inputValue}
                        labelPlacement='inside'
                        size='sm'
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <Chip
                        startContent={
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='18'
                            height='18'
                            viewBox='0 0 20 20'
                          >
                            <path
                              fill='currentColor'
                              d='M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07m12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32M9 5h2v6H9zm0 8h2v2H9z'
                            />
                          </svg>
                        }
                        className='bg-light-error text-light-onError select-none'
                      >
                        Esta accion es irreversible
                      </Chip>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        className='bg-light-primary/10 text-light-primary font-semibold'
                        onPress={() => {
                          onClose()
                          setInputValue('')
                        }}
                      >
                        Cerrar
                      </Button>
                      <Button
                        className='bg-light-error text-light-onError font-semibold'
                        type='submit'
                        onPress={() => {
                          onClose()
                          setInputValue('')
                        }}
                        isDisabled={
                          inputValue !==
                            `Borrar ${dataGet?.getCategory?.name}` || status
                        }
                      >
                        {status ? <Spinner /> : 'Borrar'}
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}
