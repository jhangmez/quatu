'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Checkbox } from '@nextui-org/checkbox'
import { toast } from 'react-hot-toast'
import { GetPriceQuery } from '@lib/gql/graphql'
import { FormEvent, useState, useCallback, useEffect } from 'react'
import { Spinner } from '@nextui-org/spinner'
import { CreateorUpdatePrice } from '@lib/graphql/mutation'
import { useQuery } from '@apollo/client'
import { GetPrice } from '@lib/graphql/query'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import Loading from '../loading'
import { Switch } from '@nextui-org/switch'
type UpdatePriceFields = Partial<PriceType>

type PriceType = GetPriceQuery['getPrice']

const INITIAL_DATA: PriceType = {
  id: 0,
  unitPrice: 0,
  bulkPrice: 0,
  bulkQuantity: 0,
  onSale: false,
  visible: false,
  currency: {
    name: '',
    abbreviation: ''
  }
}

export default function Precios({
  id,
  productId
}: {
  id?: number
  productId?: number
}) {
  const priceQuery = useQuery(GetPrice, {
    variables: { getPriceId: id !== undefined ? Number(id) : 0 },
    skip: !id // Omitir la consulta si no hay id
  })

  const {
    loading: loadPrice,
    error: errorPrice,
    data: dataPrice,
    refetch: refetchPrice
  } = priceQuery

  const [dataINITIAL, setDataINITIAL] = useState(INITIAL_DATA)

  const updateFields = useCallback((fields: UpdatePriceFields) => {
    setDataINITIAL((prev) => {
      return { ...prev, ...fields }
    })
  }, [])

  useEffect(() => {
    if (dataPrice?.getPrice) {
      setDataINITIAL((prev) => ({
        ...prev,
        unitPrice: dataPrice.getPrice.unitPrice
      }))
    }
  }, [dataPrice])

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
            <Switch
              isSelected={dataINITIAL.visible ?? false}
              onChange={(e) => updateFields({ visible: e.target.checked })}
              defaultSelected
              size='md'
            >
              Visible
            </Switch>

            <div className='w-full'>
              <p className='text-light-onSurface select-none'>
                Precio por unidad
              </p>
              <Input
                id='unitPrice'
                name='unitPrice'
                autoFocus
                label='Precio por unidad'
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
                className='max-w-full'
                classNames={{
                  input: ['sm:text-xl text-normal'],
                  inputWrapper: ['py-1']
                }}
              />
            </div>
            <div className='w-full'>
              <p className='text-light-onSurface select-none'>
                Precio por mayor
              </p>
              <Input
                id='bulkPrice'
                name='bulkPrice'
                autoFocus
                label='Precio por mayor'
                isRequired
                type='number'
                placeholder='0.00'
                value={String(dataINITIAL.bulkPrice)}
                variant='bordered'
                onChange={(e) =>
                  updateFields({ unitPrice: Number(e.target.value) })
                }
                startContent={
                  <div className='pointer-events-none flex items-center'>
                    <span className='text-default-400 text-small'>$</span>
                  </div>
                }
                className='max-w-full'
                classNames={{
                  input: ['sm:text-xl text-normal'],
                  inputWrapper: ['py-1']
                }}
              />
            </div>
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
