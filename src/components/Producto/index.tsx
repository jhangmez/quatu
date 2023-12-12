'use client'

import Swiper from '@components/Swiper'
import productsData from '@utils/products.json'
import { notFound } from 'next/navigation'

export default function Producto({ slug }: { slug: string }) {
  const id = slug
  const producto = productsData.find((product) => product.id === id)
  const items = [
    {
      imageSrc:
        'https://lh3.googleusercontent.com/drive-viewer/AK7aPaCLV0gsJQeDFg3ZcYiAqrr6vD4-vi_yT2RYkQuRU4ZX4LXq7MuhMPkkUgzPXUszIZFEo7mlXnxIc4PVT5Wt2mm__tP64g',
      imageAlt: 'Its etica'
    },
    {
      imageSrc:
        'https://lh3.googleusercontent.com/drive-viewer/AK7aPaBcgUDgS-kom2ltfYzgtpPRIYSGJbYUmv75QnwSxfJIEFc9CLaYYP6xkP-3Q3PPSwHeWOcyx0IlURVESx5P71KNp_Fr',
      imageAlt: 'A rock little cat'
    },
    {
      imageSrc:
        'https://lh3.googleusercontent.com/drive-viewer/AK7aPaDCWtPeUiYgnPEYTgVXO9zjHB5tUgoirWdPl2b3olaCEcYlo2MbMpkU0Vs3htE8MJqWuZuAqG_auWcFufFTCB-FSY3e',
      imageAlt: 'A woman doctor'
    }
  ]
  const images = [
    'https://lh3.googleusercontent.com/drive-viewer/AK7aPaCLV0gsJQeDFg3ZcYiAqrr6vD4-vi_yT2RYkQuRU4ZX4LXq7MuhMPkkUgzPXUszIZFEo7mlXnxIc4PVT5Wt2mm__tP64g',
    'https://lh3.googleusercontent.com/drive-viewer/AK7aPaBcgUDgS-kom2ltfYzgtpPRIYSGJbYUmv75QnwSxfJIEFc9CLaYYP6xkP-3Q3PPSwHeWOcyx0IlURVESx5P71KNp_Fr',
    'https://lh3.googleusercontent.com/drive-viewer/AK7aPaDCWtPeUiYgnPEYTgVXO9zjHB5tUgoirWdPl2b3olaCEcYlo2MbMpkU0Vs3htE8MJqWuZuAqG_auWcFufFTCB-FSY3e'
  ]

  // Si el producto no existe, se retorna un error 404.
  if (!producto) {
    return notFound()
  }

  return (
    <div className='container mx-auto lg:px-16 '>
      <div className='px-2 h-auto text-2xl text-light-primary dark:text-dark-primary font-bold mb-5 px-6 lg:px-0'>
        {producto?.nombre}
      </div>
      <div className='flex h-full flex-col lg:flex-row justify-center px-6 lg:px-0 gap-10'>
        <Swiper items={items} />
        <div className='text-light-onSurface dark:text-dark-onSurface'>
          <div>Id del producto: {producto?.id}</div>

          <div>
            Fabricante:
            <p className='text-light-primary dark:text-dark-primary font-bold'>
              {producto?.fabricante}
            </p>
          </div>

          <div>
            Stock:
            <p className='text-light-primary dark:text-dark-primary font-bold'>
              {producto?.stock}
            </p>
          </div>
          <div>
            Precio en dólares:{' '}
            <p className='text-light-primary dark:text-dark-primary font-bold'>
              $ {producto?.preciodolares}
            </p>
          </div>
          <div>
            Precio en soles:{' '}
            <p className='text-light-primary dark:text-dark-primary font-bold'>
              S/ {producto?.preciosoles}
            </p>
          </div>
          <div>
            <p className='text-light-primary dark:text-dark-primary font-bold'>
              {producto?.descuento ? 'Con descuento' : ''}
            </p>
          </div>
        </div>
      </div>
      <div className='text-2xl text-light-primary dark:text-dark-primary font-bold'>
        Descripcion
      </div>
      <div className='text-1xl text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer '>
        {producto?.descripcion}
      </div>
    </div>
  )
}
