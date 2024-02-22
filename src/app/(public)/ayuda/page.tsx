const partTitle = 'Ayuda'
const description = 'Ayuda de quatu'
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

export default function Ayuda() {
  return (
    <>
      <p className='text-light-onSurface dark:text-dark-onSurface'>
        Aca se podra solicitar la Ayuda :D
      </p>
      <p className='text-light-onSurface dark:text-dark-onSurface'>Ayuda</p>
    </>
  )
}
