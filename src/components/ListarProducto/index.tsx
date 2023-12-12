'use client'

import productsData from '@utils/products.json'
import { Badge } from '@nextui-org/badge'
import { Image } from '@nextui-org/react'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Link } from '@nextui-org/link'

export default function ListarProductos() {
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 mt-5'>
      {productsData.map((producto, index) => (
        <Card
          as={Link}
          href={`/producto/${producto?.id}`}
          key={index}
          radius='none'
          className='bg-light-surfaceContainer dark:bg-dark-surfaceContainer'
        >
          <CardHeader className='text-2xl text-light-primary dark:text-dark-primary font-bold'>
            {producto?.nombre}
          </CardHeader>

          <CardBody className='justify-center items-center flex'>
            <Image
              src='https://media.licdn.com/dms/image/D4E0BAQF8hQhYCYeIPg/company-logo_100_100/0/1694934728315?e=1707350400&v=beta&t=Xv-qkoofXDXHwiLrQabAJmozzhjR0ap8PTgBe0-Bk5A'
              alt='Jhangmez Picture'
              className='self-stretch grow shrink basis-0 rounded-xl'
              width={300}
              height={300}
            />
          </CardBody>

          <div className='self-stretch h-[auto] px-2 flex-col justify-center items-start gap-2 flex '>
            <p className='text-light-primary dark:text-dark-primary font-bold'>
              $ {producto?.preciodolares} o S/ {producto?.preciosoles}
            </p>
          </div>
          <div className='self-stretch h-[auto] px-2 flex-col justify-center items-start gap-2 flex '>
            <p className='text-light-primary dark:text-dark-primary font-bold'>
              {producto?.fabricante}
            </p>
          </div>
          <div className='self-stretch h-[auto] px-2 flex-col justify-center items-start gap-2 flex '>
            <p className='text-light-primary dark:text-dark-primary'>
              {producto?.descripcion}
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}
