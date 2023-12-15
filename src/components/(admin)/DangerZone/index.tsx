'use client'

import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'
import type { Metadata } from 'next'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'

const title = 'jhangmez | Skills'
const description = 'Pagina de jhangmez'

export const metadata: Metadata = {
  title,
  description
}

export default function DangerZone() {
  return (
    <Card className='w-full h-fit border border-light-error'>
      <CardHeader className='text-2xl text-light-error'>
        Zona Peligrosa
      </CardHeader>
      <Divider />
      <CardBody>
        <div>
          <p>Cancelar Suscripcion</p>
          <p>
            Luego de cancelar su suscripcion usted tendra 7 dias para descargar
            todo su contenido subido a la plataforma de qaTu
          </p>
          <p>Esta accion es irrevocable</p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button className='bg-light-error text-light-onError'>
          Cancelar Suscripcion
        </Button>
      </CardFooter>
    </Card>
  )
}
