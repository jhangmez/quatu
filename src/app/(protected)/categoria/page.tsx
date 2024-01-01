'use client'
import Listar from '@components/(all)/Listar'
import Agregar from '@components/(all)/Agregar'

export default function Categoria() {
  return (
    <div className='container mx-auto py-5 lg:px-8 md:px-5 px-3'>
      <h2 className='text-4xl mb-3'>Categorías</h2>
      <section className='flex flex-col gap-5 pb-5'>
        <Agregar type='categorias' />
        <Listar type='categorias' />
      </section>
    </div>
  )
}
