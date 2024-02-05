// Primero, asegúrate de importar GetProductQuery
import { GetProductQuery } from '@lib/gql/graphql'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { statusColorMap } from '@utils/auxiliars'
import { Chip } from '@nextui-org/chip'

// Luego, extrae el tipo de los precios usando Utility Types
type Price = NonNullable<
  NonNullable<GetProductQuery['getProduct']>['price']
>[number]

export default function ListarPrecios({ prices }: { prices: Price[] }) {
  return (
    <Card className='max-w-full'>
      <CardHeader className='text-xl'>Precios</CardHeader>
      <CardBody>
        <section className='flex flex-wrap gap-5'>
          {prices.length > 0 &&
            prices.map((price, index) => (
              <div
                key={index}
                className='bg-light-surface p-3 min-w-80 border-light-outline/10 rounded-xl border-2'
              >
                <p>Moneda: {price?.currency?.name}</p>
                <p>
                  Al por mayor: {price?.currency?.abbreviation}{' '}
                  {price?.bulkPrice}
                </p>
                <p>
                  Al por menor: {price?.currency?.abbreviation}{' '}
                  {price?.bulkQuantity}
                </p>
                <p>
                  Unitario: {price?.currency?.abbreviation} {price?.unitPrice}
                </p>
                <p>Oferta: {price?.onSale ? 'Si' : 'No'}</p>
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
              </div>
            ))}
        </section>
      </CardBody>
    </Card>
  )
}
