'use client'

import React from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link'
import Pricing from '@components/(public)/pricing'

export default function Home() {
  return (
    <main>
      <Header />

      <Pricing />
      <Footer />
    </main>
  )
}
