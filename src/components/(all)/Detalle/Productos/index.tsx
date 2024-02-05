import { GetProductId } from '@lib/graphql/query'
import { useQuery } from '@apollo/client'
import Loading from '../loading'
import ListarImagenes from '@components/(all)/Imagenes'
import ListarPrecios from '@components/(all)/Precios'
import ListarSubcategorias from '@components/(all)/Subcategorias'
import { Input } from '@nextui-org/input'
import { statusColorMap } from '@utils/auxiliars'
import { Chip } from '@nextui-org/chip'

export default function Producto({ slug }: { slug: string }) {
  const {
    loading: loadingGet,
    error: errorGet,
    data: dataGet,
    refetch: refGet
  } = useQuery(GetProductId, {
    variables: { getProductId: Number(slug) }
  })

  return (
    <>
      {loadingGet ? (
        <Loading />
      ) : errorGet ? (
        <p className='text-light-onSurface'>
          No existe el producto seleccionado
        </p>
      ) : (
        <section className='w-full grid gap-y-3'>
          <div className='space-y-3 flex flex-col md:space-y-0 md:flex-row md:space-x-6'>
            <div className='w-full'>
              <p className='text-light-onSurface'>ID</p>
              <Input
                label='ID'
                isRequired
                value={String(dataGet?.getProduct?.id)}
                isReadOnly={true}
                className='max-w-full'
              />
            </div>
            <div className='w-full'>
              <p className='text-light-onSurface'>Nombre</p>
              <Input
                label='Nombre del producto'
                isRequired
                value={dataGet?.getProduct?.name}
                isReadOnly={true}
                className='max-w-full'
              />
            </div>
          </div>
          <div className='space-y-3 flex flex-col md:space-y-0 md:flex-row md:space-x-6'>
            <div className='w-full'>
              <p className='text-light-onSurface'>SKU</p>
              <Input
                label='SKU'
                value={dataGet?.getProduct?.SKU ?? ''}
                isReadOnly={true}
                className='max-w-full'
              />
            </div>
            <div className='w-full'>
              <p className='text-light-onSurface'>UPC</p>
              <Input
                label='UPC'
                value={dataGet?.getProduct?.UPC ?? ''}
                isReadOnly={true}
                className='max-w-full'
              />
            </div>
          </div>

          <ListarSubcategorias
            subcategories={dataGet?.getProduct?.category ?? []}
          />
          <ListarImagenes images={dataGet?.getProduct?.image ?? []} />
          <ListarPrecios prices={dataGet?.getProduct?.price ?? []} />

          <p>
            Producto visible:{' '}
            <Chip
              className='capitalize select-none'
              color={
                dataGet?.getProduct?.visible
                  ? statusColorMap['true']
                  : statusColorMap['false']
              }
              size='sm'
              variant='flat'
            >
              {dataGet?.getProduct?.visible ? 'Visible' : 'No visible'}
            </Chip>
          </p>
        </section>
      )}
    </>
  )
}
