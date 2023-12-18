'use client'

import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Borrar } from '@lib/graphql/query'
import { useQuery } from '@apollo/client'
import { Skeleton } from '@nextui-org/skeleton'

interface ListarProductosProps {
  valorInt: number
}

export default function ListarProductos({ valorInt }: ListarProductosProps) {
  const { loading, error, data, refetch } = useQuery(Borrar, {
    variables: { companyId: valorInt }
  })
  return (
    <>
      {loading ? (
        <div className='max-w-[300px] w-full flex items-center gap-3'>
          <div>
            <Skeleton className='flex rounded-full w-12 h-12' />
          </div>
        </div>
      ) : error ? (
        <p className='text-light-onSurface dark:text-dark-onSurface'>
          Error {error.message}
        </p>
      ) : (
        <>
          {data?.allListsByCompany.map((lista, index) => (
            <Card
              key={index}
              className='bg-light-secondaryContainer dark:bg-dark-secondaryContainer w-fit'
            >
              <p className='text-2xl text-light-primary dark:text-dark-primary font-bold'>
                {lista?.name} de {lista?.company?.name}
              </p>
              <CardBody>
                {lista?.product?.map((product, productIndex) => (
                  <Card
                    key={productIndex}
                    radius='none'
                    className='bg-light-secondaryContainer dark:bg-dark-secondaryContainer'
                  >
                    <CardHeader className='text-2xl text-light-primary dark:text-dark-primary font-bold'>
                      {product?.name}
                    </CardHeader>
                    <CardBody>
                      <p className='text-light-onSurface dark:text-dark-onSurface'>
                        SKU: {product?.SKU}
                      </p>
                      <p className='text-light-onSurface dark:text-dark-onSurface'>
                        UPC: {product?.UPC}
                      </p>
                    </CardBody>
                  </Card>
                ))}
              </CardBody>
            </Card>
          ))}
        </>
      )}
    </>
  )
}
