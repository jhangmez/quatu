'use client'
import ListarProductos from '@components/(all)/Listar'
import { Accordion, AccordionItem } from '@nextui-org/accordion'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'

export default function Producto() {
  return (
    <div className='container mx-auto py-5 lg:px-8 md:px-5 px-3'>
      <h2 className='text-4xl mb-3'>Productos</h2>
      <Accordion
        variant='shadow'
        className='bg-light-background text-light-onBackground mb-2'
      >
        <AccordionItem key='1' aria-label='funcion' title='Como funciona'>
          <>
            <p>
              Si deseas borrar en el tacho de basura, esta accion es
              irreversible.
            </p>
          </>
        </AccordionItem>
      </Accordion>
      <Button
        variant='solid'
        color='primary'
        className='text-light-onPrimary'
        as={Link}
        href='/producto/agregar'
      >
        Agregar producto
      </Button>
      <section className='flex flex-col gap-5 pb-5'>
        <ListarProductos type='productos' />
      </section>
    </div>
  )
}
