import { notFound } from 'next/navigation'
import { GetProductId } from '@lib/graphql/query'
import { useQuery } from '@apollo/client'
import Loading from '../loading'
import NextImage from 'next/image'
import { Image } from '@nextui-org/image'

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
          <div>
            Images:
            {(dataGet?.getProduct?.image?.length ?? 0) > 0 ? (
              dataGet?.getProduct?.image?.map((img, index) => (
                <p key={index}>
                  Image Link: {img?.link}
                  <Image
                    as={NextImage}
                    width={150}
                    height={150}
                    src={img?.link}
                    fallbackSrc='/loadingImage.webp'
                    alt='Imagen de la categoria'
                  />
                </p>
              ))
            ) : (
              <p>No hay imágenes asociadas a este producto.</p>
            )}
          </div>
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
