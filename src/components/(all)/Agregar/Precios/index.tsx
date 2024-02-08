'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Checkbox } from '@nextui-org/checkbox'
import { toast } from 'react-hot-toast'
import { FormData } from './types'
import { FormEvent, useState, useCallback } from 'react'
import { Spinner } from '@nextui-org/spinner'
import { CreateorUpdatePrice } from '@lib/graphql/mutation'
import { useQuery } from '@apollo/client'
import { GetPrice } from '@lib/graphql/query'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import Loading from '../loading'

const INITIAL_DATA: FormData = {
  unitPrice: 0,
  bulkPrice: 0,
  bulkQuantity: 0,
  onSale: false,
  visible: false,
  currencyId: 0
}

export default function Precios({
  id,
  productId
}: {
  id?: number
  productId?: number
}) {
  const priceQuery = id
    ? useQuery(GetPrice, {
        variables: { getPriceId: Number(id) },
        skip: !id // Omitir la consulta si no hay id
      })
    : { loading: false, error: null, data: null, refetch: null }

  const {
    loading: loadPrice,
    error: errorPrice,
    data: dataPrice,
    refetch: refetchPrice
  } = priceQuery

  const [dataINITIAL, setDataINITIAL] = useState(INITIAL_DATA)

  const updateFields = useCallback((fields: Partial<FormData>) => {
    setDataINITIAL((prev) => {
      return { ...prev, ...fields }
    })
  }, [])

  return (
    <>
      {loadPrice ? (
        <Loading />
      ) : errorPrice ? (
        <p className='text-light-onSurface'>No existe el precio seleccionado</p>
      ) : (
        <Card>
          <CardHeader className='text-2xl'>
            {id && `Editar precio`}
            {productId && `Agregar Precio`}
          </CardHeader>
          <CardBody>
            <p>{dataPrice?.getPrice.unitPrice ?? 'Nop hay precio unitario'}</p>
            <Input
              id='unitPrice'
              name='unitPrice'
              autoFocus
              label='Precio unitario'
              isRequired
              type='number'
              placeholder='0.00'
              value={String(dataINITIAL.unitPrice)}
              variant='bordered'
              onChange={(e) =>
                updateFields({ unitPrice: Number(e.target.value) })
              }
              startContent={
                <div className='pointer-events-none flex items-center'>
                  <span className='text-default-400 text-small'>$</span>
                </div>
              }
            />
            <Checkbox
              isSelected={dataINITIAL.visible}
              onChange={(e) => updateFields({ visible: e.target.checked })}
            >
              Visible
            </Checkbox>
          </CardBody>
          <CardFooter>
            {' '}
            <Button type='submit'>Enviar</Button>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
