import Detalle from '@components/(all)/Detalle'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'

export default function Productos({ params }: { params: { slug: string } }) {
  return (
    <div className='container mx-auto py-5 lg:px-8 md:px-5 px-3'>
      <Button
        href='/producto'
        as={Link}
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
        className='text-light-primary border-light-primary'
        variant='bordered'
      >
        Retornar
      </Button>
      <Detalle type='productos' slug={params.slug} />
    </div>
  )
}