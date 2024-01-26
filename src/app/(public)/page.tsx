import React from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Pricing from '@components/(public)/pricing'
import ListarProducto from '@components/(public)/Listar/Producto'

const quatu = ' | quatu'
const title = `Página principal${quatu}`
const description = 'Bienvenidos a quatu'
const imageUrl = `https://quatu.vercel.app/api/og?title=Pagina Principal de quatu&description=${description}`

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'article',
    url: 'https://quatu.vercel.app/',
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
    <>
      <Pricing />
    </>
  )
}
