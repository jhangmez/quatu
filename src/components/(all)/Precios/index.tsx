// Primero, asegúrate de importar GetProductQuery
import { GetProductQuery } from '@lib/gql/graphql'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { statusColorMap } from '@utils/auxiliars'
import { Chip } from '@nextui-org/chip'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'

type Price = NonNullable<
  NonNullable<GetProductQuery['getProduct']>['price']
>[number]

export default function ListarPrecios({
  prices,
  productId
}: {
  prices: Price[]
  productId?: number
}) {
  return (
    <Card className='max-w-full'>
      <CardHeader className='text-xl'>Precios</CardHeader>
      <CardBody>
        <ul className='flex flex-wrap grid-1-4 grid-1-3-m grid-1-2-s grid-1-1-xs pt-2 gap-2'>
          <Link
            as={'li'}
            href={
              productId ? `/precio/agregar/${productId}` : '/precio/agregar'
            }
            className='h-60 w-60 flex flex-col gap-2 items-center justify-center border-dashed border-2 border-light-outline rounded-xl bg-light-surface text-light-onSurface select-none'
          >
            <p className='text-base sm:text-lg'>Crear precio</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path fill='currentColor' d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z' />
            </svg>
          </Link>
          {prices.length > 0 &&
            prices.map((price, index) => (
              <li
                key={index}
                className='bg-light-surface p-3 w-60 border-light-outline/10 rounded-xl border-2 space-y-1'
              >
                <p>Moneda: {price?.currency?.name}</p>
                <p>
                  Al por mayor:{' '}
                  {price?.bulkPrice
                    ? `${price?.currency?.abbreviation} ${price?.bulkPrice}`
                    : ''}
                </p>
                <p>
                  Unitario: {price?.currency?.abbreviation} {price?.unitPrice}
                </p>
                <p>
                  Oferta:{' '}
                  <Chip
                    className='capitalize select-none'
                    color={
                      price?.onSale
                        ? statusColorMap['true']
                        : statusColorMap['false']
                    }
                    size='sm'
                    variant='flat'
                  >
                    {price?.onSale ? 'SI' : 'NO'}
                  </Chip>
                </p>
                <p>
                  Visible:{' '}
                  <Chip
                    className='capitalize select-none'
                    color={
                      price?.visible
                        ? statusColorMap['true']
                        : statusColorMap['false']
                    }
                    size='sm'
                    variant='flat'
                  >
                    {price?.visible ? 'Visible' : 'No visible'}
                  </Chip>
                </p>
                <Button
                  className='bg-light-tertiary text-light-onSecondary'
                  as={Link}
                  href={`/precio/editar/${price?.id}`}
                >
                  Editar
                </Button>
              </li>
            ))}
        </ul>
      </CardBody>
    </Card>
  )
}
