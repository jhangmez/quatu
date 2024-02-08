import Agregar from '@components/(all)/Agregar'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'

export default function Productos({ params }: { params: { slug: number } }) {
  return (
    <div className='container mx-auto py-5 lg:px-8 md:px-5 px-3 space-y-5'>
      <Button
        href='/producto'
        as={Link}
        color='primary'
        startContent={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11z'
            />
          </svg>
        }
        className='text-light-onPrimary border-light-onPrimary'
        variant='solid'
      >
        Retornar
      </Button>
      <Agregar type='productos' slug={params.slug} />
    </div>
  )
}
