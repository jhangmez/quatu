'use client'

import { Myself } from '@lib/graphql/query'
import { useQuery } from '@apollo/client'
import { Skeleton } from '@nextui-org/skeleton'

export default function Home() {
  const {
    loading: loadMe,
    error: errorMe,
    data: dataMe,
    refetch: refetchMe
  } = useQuery(Myself)

  return (
    <section>
      <p>
        Bienvenido al Dashboard de la tienda
        {loadMe ? (
          <Skeleton className='h-3 w-3/5 rounded-lg' />
        ) : errorMe ? (
          <p className='text-light-onSurface dark:text-dark-onSurface'>
            Hubo un error: {errorMe.message}
          </p>
        ) : (
          <> {dataMe?.me?.company?.name || ''}</>
        )}
      </p>
      {loadMe ? (
        <Skeleton className='h-3 w-3/5 rounded-lg' />
      ) : errorMe ? (
        <p className='text-light-onSurface dark:text-dark-onSurface'>
          Hubo un error: {errorMe.message}
        </p>
      ) : (
        <p>{dataMe?.me?.name || ''}</p>
      )}
      {/* <UploadButton
        endpoint='imageUploader'
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res)
          // toast.success('Successfully toasted!')
          let uploadedFileUrls = res.map((file) => file.url).join(', ')
          toast.success(`Successfully uploaded! File URLs: ${uploadedFileUrls}`)
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast.error(`ERROR! ${error.message}`)
        }}
        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log('Uploading: ', name)
        }}
      /> */}
    </section>
  )
}
