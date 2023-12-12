import React, { useRef, useState } from 'react'
import { SwiperItemType } from '@typescustom/swipertypes'
import SwiperItem from './SwiperItem'

import { getRefValue, useStateRef } from '../../lib/hooks'
import { getTouchEventData } from '../../lib/dom'

// import './Swiper.css'

// exported so we can use later in tests
export type Props = {
  items: Array<SwiperItemType>
}
const MIN_SWIPE_REQUIRED = 40

function Swiper({ items }: Props) {
  const [isSwiping, setIsSwiping] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const containerRef = useRef<HTMLUListElement>(null)
  const minOffsetXRef = useRef(0)
  const currentOffsetXRef = useRef(0)
  const containerWidthRef = useRef(0)
  const startXRef = useRef(0)
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0)

  const onMouseMove = (e: MouseEvent) => {
    const currentX = e.clientX
    const diff = getRefValue(startXRef) - currentX
    const newOffsetX = getRefValue(currentOffsetXRef) - diff

    setOffsetX(newOffsetX)
  }
  const onMouseUp = () => {
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('mousemove', onMouseMove)
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    currentOffsetXRef.current = getRefValue(offsetXRef)
    startXRef.current = e.clientX
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }
  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentX = getTouchEventData(e).clientX
    const diff = getRefValue(startXRef) - currentX
    let newOffsetX = getRefValue(currentOffsetXRef) - diff

    setOffsetX(newOffsetX)

    const maxOffsetX = 0
    const minOffsetX = getRefValue(minOffsetXRef)
    if (newOffsetX > maxOffsetX) {
      newOffsetX = maxOffsetX
    }
    if (newOffsetX < minOffsetX) {
      newOffsetX = minOffsetX
    }

    setOffsetX(newOffsetX)
  }
  const onTouchEnd = () => {
    const containerWidth = getRefValue(containerWidthRef)
    const currentOffsetX = getRefValue(currentOffsetXRef)
    let newOffsetX = getRefValue(offsetXRef)

    const diff = currentOffsetX - newOffsetX

    // we need to check difference in absolute/positive value (if diff is more than 40px)
    if (Math.abs(diff) > MIN_SWIPE_REQUIRED) {
      if (diff > 0) {
        // swipe to the right if diff is positive
        newOffsetX = Math.floor(newOffsetX / containerWidth) * containerWidth
      } else {
        // swipe to the left if diff is negative
        newOffsetX = Math.ceil(newOffsetX / containerWidth) * containerWidth
      }
    } else {
      // remain in the current image
      newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth
    }

    setIsSwiping(false)
    setOffsetX(newOffsetX)
    setCurrentIdx(Math.abs(newOffsetX / containerWidth))

    window.removeEventListener('touchend', onTouchEnd)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('mouseup', onTouchEnd)
    window.removeEventListener('mousemove', onTouchMove)
  }
  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    setIsSwiping(true)

    currentOffsetXRef.current = getRefValue(offsetXRef)
    startXRef.current = getTouchEventData(e).clientX

    const containerEl = getRefValue(containerRef)
    const containerWidth = containerEl.offsetWidth

    containerWidthRef.current = containerWidth
    minOffsetXRef.current = containerEl.offsetWidth - containerEl.scrollWidth

    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('mousemove', onTouchMove)
    window.addEventListener('mouseup', onTouchEnd)
  }

  const indicatorOnClick = (idx: number) => {
    const containerEl = getRefValue(containerRef)
    const containerWidth = containerEl.offsetWidth

    setCurrentIdx(idx)
    setOffsetX(-(containerWidth * idx))
  }

  return (
    <div
      className='lg:w-1/2 sm:w-fit lg:max-w-fit  overflow-auto overflow-hidden touch:pan-y'
      onTouchStart={onTouchStart}
      onMouseDown={onTouchStart}
    >
      <ul
        ref={containerRef}
        className={`flex flex-row list-none p-0 m-0 transform-gpu ease-out duration-300 ${
          isSwiping ? 'transition-none' : ''
        }`}
        style={{ transform: `translate3d(${offsetX}px, 0, 0)` }}
      >
        {items.map((item, idx) => (
          <SwiperItem key={idx} {...item} />
        ))}
      </ul>
      <ul className='flex justify-center list-none m-0 p-0 mt-4'>
        {items.map((_item, idx) => (
          <li
            key={idx}
            className={` ${
              currentIdx === idx ? 'bg-gray-700' : 'bg-gray-300'
            } rounded-full w-3 h-3 m-1 cursor-pointer`}
            data-testid='indicator' // we'll use this later on our test
            onClick={() => indicatorOnClick(idx)}
          />
        ))}
      </ul>
    </div>
  )
}

export default Swiper
