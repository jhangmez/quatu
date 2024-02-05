'use client'

import { useState } from 'react'
import { Image } from '@nextui-org/image'
import NextImage from 'next/image'
import { Link } from '@nextui-org/link'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { toast } from 'react-hot-toast'

import { UploadDropzone } from '@utils/uploadthing'

export type Image = { __typename?: 'LinkImageProduct'; link: string } | null

export default function ListarImagenes({ images }: { images: Image[] }) {
  const [hoverText, setHoverText] = useState<{ [key: number]: string }>({})

  return (
    <Card className='max-w-full'>
      <CardHeader className='text-xl'>Imágenes</CardHeader>

      <div className='flex p-4 flex-wrap gap-5'>
        <UploadDropzone
          endpoint='imageUploader'
          className='border-dashed border-light-outline rounded-xl border-2'
          appearance={{
            container:
              'h-[150px] w-[150px] p-0 mt-0 bg-light-surface select-none',
            label:
              'flex mt-0 w-fit text-light-onSurface text-sm sm:text-normal ut-uploading:hidden hover:text-light-primary',
            button:
              'flex w-fit h-fit px-2 py-1 rounded-xl bg-light-primary text-sm mt-2 ut-uploading:hidden',
            allowedContent:
              'ut-uploading:text-light-Error ut-uploading:text-sm',
            uploadIcon: 'mb-2'
          }}
          content={{
            uploadIcon({ isUploading }) {
              return (
                <>
                  {isUploading ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='36'
                      height='36'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M11 20H6.5q-2.275 0-3.887-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.625-2.3 2.5-3.725T12 4q2.925 0 4.963 2.038T19 11q1.725.2 2.863 1.488T23 15.5q0 1.875-1.312 3.188T18.5 20H13v-7.15l1.6 1.55L16 13l-4-4l-4 4l1.4 1.4l1.6-1.55z'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='36'
                      height='36'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M6.5 20q-2.275 0-3.887-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.625-2.3 2.5-3.725T12 4q2.925 0 4.963 2.038T19 11q1.725.2 2.863 1.488T23 15.5q0 1.875-1.312 3.188T18.5 20z'
                      />
                    </svg>
                  )}
                </>
              )
            },
            button({ ready }) {
              return <>{ready ? 'Subir imagen' : 'Preparando subida...'}</>
            },
            label: ({}) => {
              return <>Subir imagen</>
            },

            allowedContent({ ready, fileTypes, isUploading }) {
              if (!ready) return 'Verificando'
              if (isUploading) return 'Subiendo imagen...'
              return `Tipo: ${fileTypes.join(', ')}`
            }
          }}
          onUploadBegin={() => {
            toast('Comenzado a subir.', {
              icon: '⏳'
            })
          }}
          onClientUploadComplete={(res) => {
            let uploadedFileUrls = res.map((file) => file.url).join(', ')
            toast.success(
              `Successfully uploaded! File URLs: ${uploadedFileUrls}`
            )
            toast.success('Archivo subido correctamente!')
            let firstFileUrl = res[0].url
            console.log(`Se subio correctamente la imagen ${firstFileUrl}`)
          }}
          onUploadError={(error: Error) => {
            toast.error(`ERROR! ${error.message}`)
          }}
        />
        {/* <div className='h-[150px] w-[150px] flex flex-col gap-2 items-center justify-center border-dashed border-2 border-light-outline rounded-xl bg-light-surface text-light-onSurface select-none'>
          <p className='text-sm sm:text-normal'>Subir imagen</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path fill='currentColor' d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z' />
          </svg>
        </div> */}
        {images.length > 0 &&
          images.map((img, index) => (
            <div
              className='flex flex-col items-center justify-center'
              key={index}
            >
              <Link
                href={img?.link}
                isExternal
                className='relative'
                onMouseEnter={() =>
                  setHoverText((prev) => ({
                    ...prev,
                    [index]: 'Ver imagen'
                  }))
                }
                onMouseLeave={() =>
                  setHoverText((prev) => ({ ...prev, [index]: '' }))
                }
              >
                <Image
                  as={NextImage}
                  width={150}
                  height={150}
                  className='opacity-100 hover:opacity-50'
                  src={img?.link}
                  fallbackSrc='/loadingImage.webp'
                  alt='Imagen del producto'
                />
                {hoverText[index] && (
                  <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 font-bold'>
                    {hoverText[index]}
                  </span>
                )}
              </Link>
              <Link href={img?.link} isExternal>
                Ver imagen
              </Link>
            </div>
          ))}
      </div>
    </Card>
  )
}
