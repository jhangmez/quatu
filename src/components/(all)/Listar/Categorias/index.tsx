'use client'
import React, { useCallback, useState, Key, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { AllCategoriesByCompany } from '@lib/graphql/query'
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
  const { loading, error, data, refetch } = useQuery(AllCategoriesByCompany, {
    variables: { companyId: Number(process.env.NEXT_PUBLIC_COMPANYID) }
  })

  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const pages = Math.ceil(
    (data?.allCategoriesByCompany?.length || 0) / rowsPerPage
  )

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
            className='capitalize'
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
              </Tooltip>
              <Tooltip content='Editar'>
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
              </Tooltip>
              <Tooltip color='danger' content='Borrar'>
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
              </Tooltip>
            </div>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

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
            <TableColumn key={column.key}>{column.label}</TableColumn>
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
      {/* <Button
        className='bg-light-tertiary text-light-onTertiary'
        onClick={() => refetch()}
      >
        Actualizar
      </Button> */}
    </>
  )
}
