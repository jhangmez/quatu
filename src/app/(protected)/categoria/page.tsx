'use client'
import Listar from '@components/(all)/Listar'
import Agregar from '@components/(all)/Agregar'
import { Accordion, AccordionItem } from '@nextui-org/accordion'

export default function Categoria() {
  return (
    <div className='container mx-auto py-5 lg:px-8 md:px-5 px-3'>
      <h2 className='text-4xl mb-3'>Categorías</h2>
      <Accordion
        variant='shadow'
        className='bg-light-background text-light-onBackground mb-2'
      >
        <AccordionItem key='1' aria-label='funcion' title='Como funciona'>
          <>
            <p>
              Debes crear una categoria, luego en el ojo se asigna subcategorias
              a la categoria que haz creado.
            </p>
            <p>
              Si necesitas modificar el nombre o el estado visible en el lapiz.
            </p>
            <p>
              Si deseas borrar en el tacho de basura, esta accion es
              irreversible.
            </p>
          </>
        </AccordionItem>
      </Accordion>
      <section className='flex flex-col gap-5 pb-5'>
        <Agregar type='categorias' />
        <Listar type='categorias' />
      </section>
    </div>
  )
}
