import React from 'react'
import Pricing from '@components/(public)/pricing'

const partTitle = 'Página principal'
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

export default function Home() {
  return (
    <section className='space-y-4'>
      <Pricing />
    </section>
  )
}
