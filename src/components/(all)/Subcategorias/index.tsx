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
          <div className='p-2 w-56 flex flex-row gap-2 items-center justify-center border-dashed border-2 border-light-outline rounded-xl bg-light-surface text-light-onSurface select-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path fill='currentColor' d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z' />
            </svg>
            <p className='text-sm sm:text-normal'>Agregar</p>
          </div>
          {subcategories &&
            subcategories.length > 0 &&
            subcategories.map((subcategory, index) => (
              <div
                key={index}
                className='bg-light-surface p-3 min-w-80 border-light-outline/10 rounded-xl border-2'
              >
                <p>{subcategory ? subcategory.name : 'N/A'}</p>
              </div>
            ))}
        </section>
      </CardBody>
    </Card>
  )
}
