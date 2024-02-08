import Productos from './Productos'
import Categorias from './Categorias'

export default function Editar({
  type,
  slug
}: {
  type: 'productos' | 'categorias'
  slug: string
}) {
  return (
    <>
      {type === 'productos' && <Productos slug={slug} />}
      {type === 'categorias' && <Categorias slug={slug} />}
    </>
  )
}
