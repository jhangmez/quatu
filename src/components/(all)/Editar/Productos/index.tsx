import { notFound } from 'next/navigation'

export default function Producto({ slug }: { slug: string }) {
  const id = slug
  // const producto = productsData.find((product) => product.id === id)
  // if (!producto) {
  //   return notFound()
  // }
  return (
    <>
      <p>HGOLAA</p>
      <p>{id}</p>
      <p>HGOLAA</p>
      <p>HGOLAA</p>
    </>
  )
}
