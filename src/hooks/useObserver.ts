import { useEffect, useRef } from 'react'

export const useObserver = (ref: React.RefObject<HTMLDivElement | null>, callback: () => void, isLoading: boolean) => {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (isLoading) return
    if (observerRef.current) observerRef.current.disconnect()

    const cb = function (entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting) {
        callback()
      }
    }
    observerRef.current = new IntersectionObserver(cb)
    if (ref.current) observerRef.current.observe(ref.current)

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [isLoading])
}
