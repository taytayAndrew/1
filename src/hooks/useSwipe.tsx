import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

interface Config {
  onTouchStart?: (e: TouchEvent) => void
  onTouchMove?: (e: TouchEvent) => void
  onTouchEnd?: (e: TouchEvent) => void
}
export const useSwipe = (elementRef: RefObject<HTMLElement>, config?: Config) => {
  const [direction, setDirection] = useState<'' | 'left' | 'right'|'up'|'down'>('')
  const x = useRef(-1)
  const y = useRef(-1)
  const onTouchStart = (e: TouchEvent) => {
    config?.onTouchStart?.(e)
    x.current = e.touches[0].clientX
    y.current = e.touches[0].clientY
  }
  const onTouchMove = (e: TouchEvent) => {
    config?.onTouchMove?.(e)
    const newX = e.touches[0].clientX
    const newY = e.touches[0].clientY
    const dX = newX - x.current
    const dY = newY - y.current
    if(Math.abs(dX)>Math.abs(dY)){
      if (Math.abs(dX) < 3) {
        setDirection('')
      } else if (dX > 0) {
        setDirection('right')
      } else {
        setDirection('left')
      }
    }
    else{
      if (Math.abs(dY) < 3) {
        setDirection('')
      } else if (dY > 0) {
        setDirection('down')
      } else {
        setDirection('up')
      }
    }
   
  }
  const onTouchEnd = (e: TouchEvent) => {
    config?.onTouchEnd?.(e)
    setDirection('')
  }
  useEffect(() => {
    if (!elementRef.current) { return }
    elementRef.current.addEventListener('touchstart', onTouchStart)
    elementRef.current.addEventListener('touchmove', onTouchMove)
    elementRef.current.addEventListener('touchend', onTouchEnd)
    return () => {
      if (!elementRef.current) { return }
      elementRef.current.removeEventListener('touchstart', onTouchStart)
      elementRef.current.removeEventListener('touchmove', onTouchMove)
      elementRef.current.removeEventListener('touchend', onTouchEnd)
    }
  }, [])
  return { direction }
}
