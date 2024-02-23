'use client'

import { FormEvent, useState, useCallback, useEffect } from 'react'
import { GetProductId } from '@lib/graphql/query'
import { useQuery } from '@apollo/client'
import Loading from '../loading'
import ListarImagenes from '@components/(all)/Imagenes'
import ListarPrecios from '@components/(all)/Precios'
import ListarSubcategorias from '@components/(all)/Subcategorias'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Switch } from '@nextui-org/switch'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { toast } from 'react-hot-toast'
import { CreateorUpdateProduct } from '@lib/graphql/mutation'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useApolloClient } from '@apollo/client'
import { AllProductsByCompany } from '@lib/graphql/query'
import { ProductFields, INITIAL_DATA } from '@typescustom/INITIALDATA/product'
export default function Producto({ slug }: { slug?: number }) {
  const router = useRouter()
  const apolloClient = useApolloClient()

  const [createorUpdateProduct] = useMutation(CreateorUpdateProduct)

  const productQuery = useQuery(GetProductId, {
    variables: { getProductId: slug !== undefined ? Number(slug) : 0 },
    skip: !slug // Omitir la consulta si no hay slug
  })

  const {
    loading: loadingGet,
    error: errorGet,
    data: dataGet,
    refetch: refGet
  } = productQuery

  const [dataINITIAL, setDataINITIAL] = useState(INITIAL_DATA)
  const [status, setStatus] = useState(false)

  const updateFields = useCallback((fields: ProductFields) => {
    setDataINITIAL((prev) => {
      return { ...prev, ...fields }
    })
  }, [])

  useEffect(() => {
    if (dataGet?.getProduct) {
      setDataINITIAL((prev) => ({
        ...prev,
        ...dataGet.getProduct
      }))
    }
  }, [dataGet])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus(true)
    toast
      .promise(createorUpdateProduct({ variables: dataINITIAL }), {
        loading: slug ? 'Modificando producto...' : 'Creando producto...',
        success: slug
          ? 'Producto modificado exitosamente.'
          : 'Producto creado exitosamente.',
        error: (err) => `Error: ${err.message}`
      })
      .then((result) => {
        console.log(
          'Este es el productoId resultante',
          result.data?.createOrUpdateProduct?.id
        )
        setStatus(false)
        setDataINITIAL(INITIAL_DATA)
        router.back()
        apolloClient.resetStore().then(() => {
          // Realizar una nueva consulta para obtener los datos actualizados
          apolloClient
            .query({
              query: AllProductsByCompany,
              variables: {
                /* tus variables aquí */
              }
            })
            .then((result) => {
              // console.log('Datos actualizados:', result.data)
            })
        })
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`)
      })
  }

  return (
    <>
      {loadingGet ? (
        <Loading />
      ) : errorGet ? (
        <p className='text-light-onSurface'>
          No existe el producto seleccionado
        </p>
      ) : (
        <form onSubmit={onSubmit}>
          <section className='w-full grid gap-y-3 pb-10'>
            <Card>
              <CardHeader className='text-2xl'>
                {slug ? 'Detalle de producto' : 'Crear producto'}
                {!slug ? ' ||| Se enviará producto vacío' : ''}
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className='text-xl'>Producto visible</CardHeader>
              <CardFooter>
                <Switch
                  isSelected={dataINITIAL.visible ?? true}
                  onChange={(e) => updateFields({ visible: e.target.checked })}
                  defaultSelected
                  size='md'
                  classNames={{
                    wrapper: 'bg-light-secondary/50'
                  }}
                >
                  {dataINITIAL.visible ? 'Visible' : 'No visible'}
                </Switch>
              </CardFooter>
            </Card>
            <Card>
              <CardBody className='space-y-2'>
                <div className='space-y-3 flex flex-col md:space-y-0 md:flex-row md:space-x-6'>
                  <div className='w-full'>
                    <CardHeader className='text-lg'>
                      Nombre del producto
                    </CardHeader>
                    <Input
                      label='Nombre del producto'
                      isRequired
                      value={dataINITIAL.name}
                      onChange={(e) => updateFields({ name: e.target.value })}
                      className='max-w-full'
                      classNames={{
                        input: ['sm:text-xl text-normal'],
                        inputWrapper: ['py-1']
                      }}
                    />
                  </div>
                </div>
                <div className='space-y-3 flex flex-col md:space-y-0 md:flex-row md:space-x-6'>
                  <div className='w-full'>
                    <CardHeader className='text-lg'>SKU</CardHeader>
                    <Input
                      label='SKU'
                      value={dataINITIAL.SKU || ''}
                      onChange={(e) => updateFields({ SKU: e.target.value })}
                      className='max-w-full'
                      classNames={{
                        input: ['sm:text-xl text-normal'],
                        inputWrapper: ['py-1']
                      }}
                    />
                  </div>
                  <div className='w-full'>
                    <CardHeader className='text-lg'>UPC</CardHeader>
                    <Input
                      label='UPC'
                      value={dataINITIAL.UPC || ''}
                      onChange={(e) => updateFields({ UPC: e.target.value })}
                      className='max-w-full'
                      classNames={{
                        input: ['sm:text-xl text-normal'],
                        inputWrapper: ['py-1']
                      }}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
            <ListarSubcategorias
              subcategories={dataGet?.getProduct?.category ?? []}
            />
            <ListarImagenes images={dataGet?.getProduct?.image ?? []} />
            <ListarPrecios
              prices={dataGet?.getProduct?.price ?? []}
              productId={dataGet?.getProduct?.id}
            />
            <Button
              type='submit'
              color='primary'
              isDisabled={!dataINITIAL.name || status}
              className='text-light-onPrimary'
            >
              Enviar
            </Button>
          </section>
        </form>
      )}
    </>
  )
}
