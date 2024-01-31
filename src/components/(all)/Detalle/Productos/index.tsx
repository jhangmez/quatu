import { GetProductId } from '@lib/graphql/query'
import { useQuery } from '@apollo/client'
import Loading from '../loading'
import ListarImagenes from '@components/(all)/Imagenes'

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
        <p className='text-light-onSurface dark:text-dark-onSurface'>
          No existe el producto seleccionado
        </p>
      ) : (
        <>
          <p>ID: {dataGet?.getProduct?.id}</p>
          <p>Name: {dataGet?.getProduct?.name}</p>
          <p>SKU: {dataGet?.getProduct?.SKU}</p>
          <p>UPC: {dataGet?.getProduct?.UPC}</p>
          <div>
            Categories and Subcategories:
            {dataGet?.getProduct?.category?.map((category, index) => (
              <div key={index}>
                <p>Category: {category?.__typename}</p>
                {category?.subcategory?.map((sub, subIndex) => (
                  <p key={subIndex}>Subcategory: {sub?.name}</p>
                ))}
              </div>
            ))}
          </div>
          <ListarImagenes images={dataGet?.getProduct?.image ?? []} />
          <div>
            Prices:
            {dataGet?.getProduct?.price?.map((price, index) => (
              <div key={index}>
                <p>Bulk Price: {price?.bulkPrice}</p>
                <p>Bulk Quantity: {price?.bulkQuantity}</p>
                <p>Unit Price: {price?.unitPrice}</p>
                <p>On Sale: {price?.onSale ? 'Si' : 'No'}</p>
                <p>Visible: {price?.visible ? 'Si' : 'No'}</p>
              </div>
            ))}
          </div>
          <p>Product Visible: {dataGet?.getProduct?.visible ? 'Si' : 'No'}</p>
        </>
      )}
    </>
  )
}
