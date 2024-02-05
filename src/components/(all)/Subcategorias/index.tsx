import { GetProductQuery } from '@lib/gql/graphql'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'

type Subcategory = NonNullable<
  NonNullable<GetProductQuery['getProduct']>['category']
>[number]

export default function ListarPrecios({
  subcategories
}: {
  subcategories: Subcategory[]
}) {
  return (
    <Card className='max-w-full'>
      <CardHeader className='text-xl'>Subcategorias</CardHeader>

      <CardBody>
        <section className='flex flex-wrap gap-5'>
          {subcategories &&
            subcategories.length > 0 &&
            subcategories.map((subcategory, index) => (
              <div className='bg-light-surface p-3 min-w-80 border-light-outline/10 rounded-xl border-2'>
                <p key={index}>{subcategory ? subcategory.name : 'N/A'}</p>
              </div>
            ))}
        </section>
      </CardBody>
    </Card>
  )
}
