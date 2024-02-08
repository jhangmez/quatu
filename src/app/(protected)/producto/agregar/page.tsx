'use client'

import Agregar from '@components/(all)/Agregar'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

export default function Producto() {
  const router = useRouter()

  return (
    <section className='container mx-auto py-5 lg:px-8 md:px-5 px-3'>
      <p>SOY PRODUCTOS</p>
      <Button
        onPress={() => {
          router.back()
        }}
        color='primary'
        className='text-light-onPrimary'
      >
        Regresar
      </Button>
      <Agregar type='productos' />
    </section>
  )
}
