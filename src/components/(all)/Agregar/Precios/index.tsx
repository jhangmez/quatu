'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { toast } from 'react-hot-toast'
import { FormEvent, useState, useCallback, useEffect } from 'react'
import { CreateorUpdatePrice } from '@lib/graphql/mutation'
import { AllCurrency, getCurrency } from '@lib/graphql/query'
import { useQuery } from '@apollo/client'
import { GetPrice } from '@lib/graphql/query'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import Loading from '../loading'
import { Switch } from '@nextui-org/switch'
import { Select, SelectItem } from '@nextui-org/select'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useApolloClient } from '@apollo/client'
import { GetProductId } from '@lib/graphql/query'
import { PriceFields, INITIAL_DATA } from '@typescustom/INITIALDATA/price'

export default function Precios({
  id,
  productId
}: {
  id?: number
  productId?: number
}) {
  const router = useRouter()
  const apolloClient = useApolloClient()

  const [createorUpdatePrice] = useMutation(CreateorUpdatePrice, {
    refetchQueries: ['GetProduct']
  })

  const priceQuery = useQuery(GetPrice, {
    variables: { getPriceId: id !== undefined ? Number(id) : 0 },
    skip: !id // Omitir la consulta si no hay id
  })

  const {
    loading: loCurrency,
    error: erCurrency,
    data: daCurrency,
    refetch: reCurrency
  } = useQuery(AllCurrency)

  const {
    loading: loadPrice,
    error: errorPrice,
    data: dataPrice,
    refetch: refetchPrice
  } = priceQuery

  const [dataINITIAL, setDataINITIAL] = useState(INITIAL_DATA)
  const [status, setStatus] = useState(false)

  const updateFields = useCallback((fields: PriceFields) => {
    setDataINITIAL((prev) => {
      return { ...prev, ...fields }
    })
  }, [])

  useEffect(() => {
    if (dataPrice?.getPrice && dataPrice.getPrice.currency?.id) {
      setDataINITIAL((prev) => ({
        ...prev,
        currencyId: dataPrice.getPrice.currency?.id || prev.currencyId,
        ...dataPrice.getPrice
      }))
    }
  }, [dataPrice])

  const {
    loading: logetCurrency,
    error: ergetCurrency,
    data: dagetCurrency,
    refetch: regetCurrency
  } = useQuery(getCurrency, {
    variables: { id: Number(dataINITIAL.currencyId) },
    skip: !dataINITIAL.currencyId
  })

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus(true)
    const dataToSend = { ...dataINITIAL, productId: Number(productId) }
    console.log(dataToSend)

    toast
      .promise(createorUpdatePrice({ variables: dataToSend }), {
        loading: id ? 'Modificando precio...' : 'Creando precio...',
        success: id
          ? 'Precio modificado exitosamente.'
          : 'Precio creado exitosamente.',
        error: (err) => `Error: ${err.message}`
      })
      .then(() => {
        setStatus(false)
        setDataINITIAL(INITIAL_DATA)
        router.back()
        apolloClient.resetStore().then(() => {
          // Verificar si productId está presente antes de ejecutar la consulta
          if (productId) {
            // Realizar una nueva consulta para obtener los datos actualizados
            apolloClient
              .query({
                query: GetProductId,
                variables: {
                  getProductId: Number(productId)
                  /* tus variables aquí */
                }
              })
              .then((result) => {
                console.log('Datos actualizados:', result.data)
              })
              .catch((error) => {
                toast.error(`Error: ${error.message} aki hay un errorv2`)
              })
          } else {
            // Manejar el caso cuando productId no está presente
            // Por ejemplo, puedes mostrar un mensaje de error o simplemente omitir la consulta
            console.log('productId no está presente, omitiendo la consulta.')
          }
        })
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}  aki hay un error`)
      })
  }

  return (
    <>
      {loadPrice ? (
        <Loading />
      ) : errorPrice ? (
        <p className='text-light-onSurface'>No existe el precio seleccionado</p>
      ) : (
        <form onSubmit={onSubmit}>
          <Card>
            <CardHeader className='text-2xl'>
              {id ? 'Editar precio' : 'Agregar Precio'}
              {!id && !productId ? ' ||| Se enviará producto vacío' : ''}
            </CardHeader>
            <CardBody>
              <Switch
                isSelected={dataINITIAL.visible ?? false}
                onChange={(e) => updateFields({ visible: e.target.checked })}
                defaultSelected
                size='md'
                classNames={{
                  wrapper: 'bg-light-secondary/50'
                }}
              >
                {dataINITIAL.visible ? 'Visible' : 'No visible'}
              </Switch>
              <Select
                label='Moneda'
                placeholder='Selecciona una moneda'
                isRequired
                selectedKeys={
                  dataINITIAL.currencyId === 0
                    ? []
                    : [String(dataINITIAL.currencyId)]
                }
                variant='bordered'
                errorMessage={
                  (dataINITIAL.bulkPrice !== 0 &&
                    dataINITIAL.bulkQuantity !== 0) ||
                  dataINITIAL.unitPrice !== 0
                    ? 'Debe escoger una moneda'
                    : ''
                }
                onChange={(e) =>
                  updateFields({ currencyId: Number(e.target.value) })
                }
                className='max-w-xs'
                classNames={{
                  value: ['sm:text-xl text-normal'],
                  mainWrapper: ['py-1']
                }}
              >
                {(daCurrency?.allCurrency || []).map((currency) => (
                  <SelectItem key={String(currency?.id)} value={currency?.id}>
                    {`${currency?.name} (${currency?.abbreviation})`}
                  </SelectItem>
                ))}
              </Select>
              <div className='w-full'>
                <CardHeader className='text-light-onSurface select-none'>
                  Precio por unidad
                </CardHeader>
                <Input
                  id='unitPrice'
                  name='unitPrice'
                  autoFocus
                  label='Precio por unidad'
                  isRequired
                  errorMessage={
                    (dataINITIAL.bulkPrice && dataINITIAL.bulkQuantity) !== 0
                      ? `El valor es ${
                          logetCurrency || ergetCurrency
                            ? '-'
                            : dagetCurrency?.getCurrency?.abbreviation || '-'
                        }  0`
                      : ''
                  }
                  type='number'
                  placeholder='0.00'
                  value={String(dataINITIAL.unitPrice)}
                  variant='bordered'
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    if (value >= 0) {
                      updateFields({ unitPrice: value })
                    }
                  }}
                  startContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>
                        {logetCurrency || ergetCurrency
                          ? '-'
                          : dagetCurrency?.getCurrency?.abbreviation || '-'}
                      </span>
                    </div>
                  }
                  className='max-w-full'
                  classNames={{
                    input: ['sm:text-xl text-normal'],
                    inputWrapper: ['py-1']
                  }}
                />
              </div>
              <div className='space-y-3 flex flex-col md:space-y-0 md:flex-row md:space-x-6'>
                <div className='w-full'>
                  <CardHeader className='text-light-onSurface select-none'>
                    Precio por mayor
                  </CardHeader>
                  <Input
                    id='bulkPrice'
                    name='bulkPrice'
                    autoFocus
                    label='Precio por mayor'
                    type='number'
                    placeholder='0.00'
                    value={String(dataINITIAL.bulkPrice)}
                    variant='bordered'
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      if (value >= 0) {
                        updateFields({ bulkPrice: value })
                      }
                    }}
                    startContent={
                      <div className='pointer-events-none flex items-center'>
                        <span className='text-default-400 text-small'>
                          {logetCurrency || ergetCurrency
                            ? '-'
                            : dagetCurrency?.getCurrency?.abbreviation || '-'}
                        </span>
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
                  <CardHeader className='text-light-onSurface select-none'>
                    Canitdad a por mayor
                  </CardHeader>
                  <Input
                    id='bulkQuantity'
                    name='bulkQuantity'
                    autoFocus
                    label='Cantidad a por mayor'
                    type='number'
                    placeholder='0'
                    value={String(dataINITIAL.bulkQuantity)}
                    variant='bordered'
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '' || /^\d+$/.test(value)) {
                        updateFields({ bulkQuantity: Number(value) })
                      }
                    }}
                    startContent={
                      <div className='pointer-events-none flex items-center'>
                        <span className='text-default-400 text-small'>#</span>
                      </div>
                    }
                    className='max-w-full'
                    classNames={{
                      input: ['sm:text-xl text-normal'],
                      inputWrapper: ['py-1']
                    }}
                    min={0}
                    step={1}
                  />
                </div>
              </div>
              <Switch
                isSelected={dataINITIAL.onSale ?? false}
                onChange={(e) => updateFields({ onSale: e.target.checked })}
                defaultSelected
                size='md'
                classNames={{
                  wrapper: 'bg-light-secondary/50'
                }}
              >
                {dataINITIAL.onSale ? 'Con promoción' : 'Sin promoción'}
              </Switch>
            </CardBody>
            <CardFooter>
              {' '}
              <Button
                type='submit'
                color='primary'
                className='text-light-onPrimary'
                isDisabled={
                  !dataINITIAL.currencyId ||
                  (dataINITIAL.bulkPrice !== null &&
                    dataINITIAL.bulkPrice !== undefined &&
                    dataINITIAL.bulkPrice > 0 &&
                    dataINITIAL.bulkQuantity !== null &&
                    dataINITIAL.bulkQuantity !== undefined &&
                    dataINITIAL.bulkQuantity <= 0) ||
                  status
                }
              >
                Enviar
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </>
  )
}
