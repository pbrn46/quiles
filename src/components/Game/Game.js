import React, { useRef, useEffect, useState } from 'react'
import { useStore } from '../../store'
import KeyController from '../KeyController'
import ResizeWatcher from '../ResizeWatcher'
import GameInitializer from '../GameInitializer'
import Stats from '../Stats'
import { draw } from '../../lib/draw'


function Game() {
  var [state, dispatch] = useStore()
  var [ctx, setCtx] = useState(null)
  var canvasRef = useRef()
  useEffect(() => {
    setCtx(canvasRef.current.getContext('2d'))
  }, [canvasRef])
  useEffect(() => {
    let frame
    const tick = () => {
      frame = requestAnimationFrame(tick)
      draw(state, ctx)
    }
    tick()
    return () => cancelAnimationFrame(frame)
  }, [state, ctx])
  useEffect(() => {
    dispatch({ type: 'VIEW_CENTER' })
  }, [dispatch])
  return <div className="Game">
    <ResizeWatcher />
    <KeyController />
    <canvas width={state.view.widthPx} height={state.view.heightPx} ref={canvasRef}></canvas>
    <Stats/>
    <GameInitializer />
  </div>
}

export default Game