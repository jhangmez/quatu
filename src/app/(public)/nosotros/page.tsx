const partTitle = 'Nosotros'
const description = 'Nosotros somos quatu by Harkaysoft'
const url = 'https://quatu.vercel.app/'
const title = `${partTitle} | quatu`
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

export default function Nosotros() {
  return (
    <>
      <p className='text-light-onSurface dark:text-dark-onSurface'>Nosotros</p>
    </>
  )
}
