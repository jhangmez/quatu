'use client'

import Productos from './Productos'
import Categorias from './Categorias'

export default function Listar({ type }: { type: 'productos' | 'categorias' }) {
  return (
    <div>
      {type === 'productos' && <Productos />}
      {type === 'categorias' && <Categorias />}
    </div>
  )
}
