import { useEffect, useCallback, useRef } from 'react'

import { useAppDispatch } from '../redux/hooks'
import { viewActions } from '../redux/reducers/view'

export function ResizeWatcher() {
  const dispatch = useAppDispatch()
  const divRef = useRef<HTMLDivElement | null>(null)
  const handleWindowResize = useCallback(() => {
    if (!divRef.current) return
    dispatch(viewActions.setViewWH({
      widthPx: divRef.current.offsetWidth,
      heightPx: divRef.current.offsetHeight
    }))
  }, [dispatch])
  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [handleWindowResize])

  return <div className="absolute w-full h-full" ref={divRef}></div>
}
