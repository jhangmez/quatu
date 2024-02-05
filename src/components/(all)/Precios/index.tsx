// Primero, asegúrate de importar GetProductQuery
import { GetProductQuery } from '@lib/gql/graphql'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'

// Luego, extrae el tipo de los precios usando Utility Types
type Price = NonNullable<
  NonNullable<GetProductQuery['getProduct']>['price']
>[number]

export default function ListarPrecios({ prices }: { prices: Price[] }) {
  return (
    <section className='flex flex-wrap gap-5'>
      {prices.length > 0 &&
        prices.map((price, index) => (
          <Card key={index} className='p-3'>
            <p>Moneda: {price?.currency?.name}</p>
            <p>
              Bulk Price: {price?.currency?.abbreviation} {price?.bulkPrice}
            </p>
            <p>
              Bulk Quantity: {price?.currency?.abbreviation}{' '}
              {price?.bulkQuantity}
            </p>
            <p>
              Unit Price: {price?.currency?.abbreviation} {price?.unitPrice}
            </p>
            <p>On Sale: {price?.onSale ? 'Si' : 'No'}</p>
            <p>Visible: {price?.visible ? 'Si' : 'No'}</p>
          </Card>
        ))}
    </section>
  )
}
