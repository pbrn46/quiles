import React, { useEffect, useCallback, useRef } from 'react'

import { useStore } from '../../store'

function ResizeWatcher() {
  var [, dispatch] = useStore()
  var divRef = useRef()
  const handleWindowResize = useCallback(() => {
    dispatch({
      type: 'WINDOW_RESIZE',
      widthPx: divRef.current.offsetWidth,
      heightPx: divRef.current.offsetHeight
    })
  }, [dispatch])
  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [handleWindowResize])

  return <div className="ResizeWatcher" ref={divRef}></div>
}

export default ResizeWatcher
