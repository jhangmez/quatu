'use client'

import React, { useCallback, FormEvent, useState, Key, useMemo } from 'react'
import { AllProductsByCompanyQuery, Product } from '@lib/gql/graphql'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from '@nextui-org/table'
import { useQuery } from '@apollo/client'
import { AllProductsByCompany } from '@lib/graphql/query'
import { Pagination } from '@nextui-org/pagination'
import { Tooltip } from '@nextui-org/tooltip'
import { Chip } from '@nextui-org/chip'
import { CircularProgress } from '@nextui-org/progress'
import { Skeleton } from '@nextui-org/skeleton'
import { Button } from '@nextui-org/react'
import { statusColorMap } from '@utils/auxiliars'
import { Link } from '@nextui-org/link'
import { toast } from 'react-hot-toast'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter
} from '@nextui-org/modal'
import { DeleteProduct } from '@lib/graphql/mutation'
import { useMutation } from '@apollo/client'
import { GetProductId } from '@lib/graphql/query'
import { Spinner } from '@nextui-org/spinner'
import { Input } from '@nextui-org/input'

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

export default function Productos() {
  const [status, setStatus] = useState(false)

  const { loading, error, data, refetch } = useQuery(AllProductsByCompany)

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  )

  const [deleteProduct] = useMutation(DeleteProduct, {
    refetchQueries: ['AllProductsByCompany']
  })

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange
  } = useDisclosure()

  const {
    loading: loadingGet,
    error: errorGet,
    data: dataGet,
    refetch: refGet
  } = useQuery(GetProductId, {
    variables: { getProductId: Number(selectedProductId) }
  })

  const [inputValue, setInputValue] = useState('')

  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const pages = Math.ceil(
    (data?.allProductsByCompany?.length || 0) / rowsPerPage
  )

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return data?.allProductsByCompany.slice(start, end)
  }, [page, data])

  function onSubmitDelete(e: FormEvent) {
    e.preventDefault()
    setStatus(true)
    toast
      .promise(
        deleteProduct({ variables: { id: Number(selectedProductId) } }),
        {
          loading: `Borrando categoría ${dataGet?.getProduct?.name}...`,
          success: `Categoría ${dataGet?.getProduct?.name} borrada exitosamente.`,
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

  const renderCell = useCallback(
    (
      product: AllProductsByCompanyQuery['allProductsByCompany'][number],
      columnKey: Key
    ) => {
      const cellValue = product[columnKey as keyof typeof product]

      switch (columnKey) {
        case 'name':
          return product.name
        case 'visible':
          return (
            <Chip
              className='capitalize select-none'
              color={
                cellValue ? statusColorMap['true'] : statusColorMap['false']
              }
              size='sm'
              variant='flat'
            >
              {cellValue ? 'Visible' : 'No visible'}
            </Chip>
          )
        case 'actions':
          return (
            <div className='relative flex items-center gap-2'>
              <Tooltip content='Ir a detalles'>
                <Button
                  size='sm'
                  className='bg-light-tertiary text-light-onTertiary'
                  as={Link}
                  href={`/producto/detalle/${product.id}`}
                  startContent={
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
                  }
                >
                  Detalle
                </Button>
              </Tooltip>
              <Tooltip color='danger' content='Borrar'>
                <Button
                  isIconOnly
                  variant='light'
                  size='sm'
                  onPress={() => {
                    onDeleteOpen()
                    setSelectedProductId(product.id)
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
          )
        default:
          return cellValue
      }
    },
    []
  )

  return (
    <>
      <Table
        aria-label='Productos'
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
                    <ModalHeader className='flex flex-col gap-1 text-light-error select-none'>
                      Eliminar categoría: {dataGet?.getProduct?.name}
                    </ModalHeader>
                    <ModalBody>
                      <p className='text-sm select-none'>
                        Escriba{' '}
                        <span className='italic font-medium'>
                          Borrar {dataGet?.getProduct?.name}
                        </span>
                      </p>
                      <Input
                        isRequired
                        className='max-w-xs'
                        label={
                          <>
                            Escriba{' '}
                            <span className='italic font-medium'>
                              &#34;Borrar {dataGet?.getProduct?.name}
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
                            `Borrar ${dataGet?.getProduct?.name}` || status
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
