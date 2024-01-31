import Editar from '@components/(all)/Editar'

export default function Productos({ params }: { params: { slug: string } }) {
  return (
    <>
      <p>HOLAA</p>

      <Editar type='productos' slug={params.slug} />
    </>
  )
}
