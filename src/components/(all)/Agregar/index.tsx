'use client'

import Productos from './Productos'
import Categorias from './Categorias'
import Precios from './Precios'

export default function Agregar({
  type,
  slug,
  id,
  productId
}: {
  type: 'productos' | 'categorias' | 'precios'
  slug?: number
  id?: number
  productId?: number
}) {
  return (
    <div>
      {type === 'productos' && <Productos slug={slug} />}
      {type === 'categorias' && <Categorias />}
      {type === 'precios' && <Precios id={id} productId={productId} />}
    </div>
  )
}
