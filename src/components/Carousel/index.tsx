import React, { useState } from 'react'
import Image from 'next/image'

interface CarouselProps {
  images: string[]
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length)
  }

  return (
    <div className='relative text-light-onSurface dark:text-dark-onSurface'>
      <Image
        src={images[currentImage]}
        alt='Carousel'
        width={500}
        height={500}
      />
      <button onClick={prevImage} className='absolute left- 0h-3'>
        &lt;
      </button>
      <button onClick={nextImage} className='absolute right-0 h-3'>
        &gt;
      </button>
    </div>
  )
}

export default Carousel
