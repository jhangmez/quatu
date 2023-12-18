'use client'

import React from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link'
import Pricing from '@components/(public)/pricing'
import ListarProducto from '@components/(public)/Listar/Producto'

export default function Home() {
  return (
    <main>
      <Header />
      <Pricing />
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-center  gap-2 px-5 bg-light-surface dark:bg-dark-surface'>
        <ListarProducto valorInt={5} />
        <ListarProducto valorInt={6} />
      </div>
      <Footer />
    </main>
  )
}
