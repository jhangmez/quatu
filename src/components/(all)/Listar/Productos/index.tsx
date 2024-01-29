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
import { Chip, ChipProps } from '@nextui-org/chip'
import { CircularProgress } from '@nextui-org/progress'
import { Skeleton } from '@nextui-org/skeleton'
import { Button } from '@nextui-org/react'

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

export default function Productos() {
  const { loading, error, data, refetch } = useQuery(AllProductsByCompany)

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
              className='capitalize'
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
                  // onPress={onDetailOpen}
                  onPress={() => {
                    // onDetailOpen()
                    // setSelectedCategoryId(category.id)
                  }}
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
                    // onDeleteOpen()
                    // setSelectedCategoryId(category.id)
                    // setInputValue('')
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
    </>
  )
}
