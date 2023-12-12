import React from 'react'

import Image from 'next/image'
import { SwiperItemType } from '@typescustom/swipertypes'

// import './SwiperItem.css'
export type Props = SwiperItemType

function SwiperItem({ imageSrc, imageAlt }: SwiperItemType) {
  return (
    <li className='w-full flex-none flex justify-center  border rounded-[10px]'>
      {/* <img src={imageSrc} alt={imageAlt} className='swiper-img' /> */}
      <Image
        src={`${imageSrc}`}
        alt={imageAlt}
        className='select-none'
        width={300}
        height={300}
        draggable={false}
      />
    </li>
  )
}

export default SwiperItem
