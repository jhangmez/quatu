'use client'

import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'
import Header from '@components/Header'
import Footer from '@components/Footer'

const partTitle = 'No encontrado 🤔'
const description = 'Bienvenidos a quatu'
const url = 'https://quatu.vercel.app/'
const title = `${partTitle}| quatu`
const imageUrl = `${url}api/og?title=${partTitle}&description=${description}`

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'article',
    url: url,
    images: [{ url: imageUrl }]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [imageUrl]
  }
}

export default function NotFound() {
  return (
    <main className='w-screen h-screen'>
      <div className='bg-light-surface dark:bg-dark-surface '>
        <Header />
      </div>
      <div className='bg-light-surface  dark:bg-dark-surface'>
        <div className='flex flex-col justify-center items-center h-screen'>
          <p className='text-light-onSurface dark:text-dark-onSurface'>
            <h1 className='lg:text-6xl font-bold text-2xl'>Oops!</h1>
            <h2 className='lg:text-6xl font-bold text-2xl'>No encontrado</h2>
            <div className='flex flex-col gap-2 mt-3'>
              <div>
                <Button
                  href='/home'
                  as={Link}
                  className='text-light-primary dark:text-dark-primary bg-light-onPrimary dark:bg-dark-onPrimary'
                  variant='flat'
                >
                  Retornar
                </Button>
              </div>
            </div>
          </p>
        </div>
      </div>
      <div className='bg-light-surface dark:bg-dark-surface'>
        <Footer />
      </div>
    </main>
  )
}
