'use client'
import React, { useCallback, FormEvent, useState, Key, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { AllCategoriesByCompany } from '@lib/graphql/query'
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
import { DeleteCategory } from '@lib/graphql/mutation'
import { useMutation } from '@apollo/client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter
} from '@nextui-org/modal'
import { Spinner } from '@nextui-org/spinner'

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
    key: 'visible',
    label: 'ESTADO'
  },
  {
    key: 'actions',
    label: 'ACCIONES'
  }
]

export default function Categorias() {
  const [deleteCategory] = useMutation(DeleteCategory, {
    refetchQueries: ['AllCategoriesByCompany']
  })

  const { loading, error, data, refetch } = useQuery(AllCategoriesByCompany)
  const [inputValue, setInputValue] = useState('')
  const [status, setStatus] = useState(false)

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  )

  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const pages = Math.ceil(
    (data?.allCategoriesByCompany?.length || 0) / rowsPerPage
  )
  // const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
                  // onPress={onEditOpen}
                  onPress={() => {
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

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus(true)
    deleteCategory({ variables: { id: Number(selectedCategoryId) } })
      .then(() => {
        setStatus(false)
        toast.success('Categoria borrada exitosamente.')
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`)
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
        isOpen={isDetailOpen}
        onOpenChange={onDetailOpenChange}
        isDismissable={false}
        backdrop='opaque'
        size='5xl'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Visualizar categoria
              </ModalHeader>
              <ModalBody>
                {selectedCategoryId}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        isDismissable={false}
        backdrop='opaque'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Editar categoria
              </ModalHeader>
              <ModalBody>
                {selectedCategoryId}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        backdrop='opaque'
      >
        <form onSubmit={onSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1 text-light-error'>
                  Eliminar categoria
                </ModalHeader>
                <ModalBody>
                  {selectedCategoryId}
                  <p className='text-sm select-none'>
                    Escriba{' '}
                    <span className='italic font-medium'>Borrar categoría</span>
                  </p>
                  <Input
                    isRequired
                    className='max-w-xs'
                    label='Escriba &#34;Borrar categoría&#34;'
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
                    isDisabled={inputValue !== 'Borrar categoría' || status}
                  >
                    {status ? <Spinner /> : 'Borrar'}
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
