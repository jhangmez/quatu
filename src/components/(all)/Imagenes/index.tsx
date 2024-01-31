'use client'

import { useState } from 'react'
import { Image } from '@nextui-org/image'
import NextImage from 'next/image'
import { Link } from '@nextui-org/link'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'

export type Image = { __typename?: 'LinkImageProduct'; link: string } | null

export default function ListarImagenes({ images }: { images: Image[] }) {
  const [hoverText, setHoverText] = useState<{ [key: number]: string }>({})

  return (
    <Card className='max-w-full'>
      <CardHeader className='text-xl'>Imágenes</CardHeader>
      <div className='flex p-4 flex-wrap gap-5'>
        {images.length > 0 &&
          images.map((img, index) => (
            <div
              className='flex flex-col items-center justify-center'
              key={index}
            >
              <Link
                href={img?.link}
                isExternal
                className='relative'
                onMouseEnter={() =>
                  setHoverText((prev) => ({
                    ...prev,
                    [index]: 'Ver imagen'
                  }))
                }
                onMouseLeave={() =>
                  setHoverText((prev) => ({ ...prev, [index]: '' }))
                }
              >
                <Image
                  as={NextImage}
                  width={120}
                  height={120}
                  className='opacity-100 hover:opacity-50'
                  src={img?.link}
                  fallbackSrc='/loadingImage.webp'
                  alt='Imagen del producto'
                />
                {hoverText[index] && (
                  <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 font-bold'>
                    {hoverText[index]}
                  </span>
                )}
              </Link>
              <Link href={img?.link} isExternal>
                Ver imagen
              </Link>
            </div>
          ))}
        <div className='h-28 w-28 flex flex-col gap-2 items-center justify-center border-dashed border-2 border-light-outline rounded-xl bg-light-surface text-light-onSurface select-none'>
          <p className='text-sm sm:text-normal'>Subir imagen</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path fill='currentColor' d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z' />
          </svg>
        </div>
      </div>
    </Card>
  )
}
