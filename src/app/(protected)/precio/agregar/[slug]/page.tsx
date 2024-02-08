'use client'

import Agregar from '@components/(all)/Agregar'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

export default function Precio({ params }: { params: { slug: number } }) {
  const router = useRouter()
  return (
    <section className='container mx-auto py-5 lg:px-8 md:px-5 px-3'>
      <p>SOY Precio</p>
      <Button
        onPress={() => {
          router.back()
        }}
      >
        Regresar
      </Button>
      <Agregar type='precios' productId={params.slug} />
    </section>
  )
}
