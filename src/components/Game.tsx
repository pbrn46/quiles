import React, { useRef, useEffect, useState } from 'react'
import KeyController from './KeyController'
import { ResizeWatcher } from './ResizeWatcher'
import { Stats } from './Stats'
import { draw } from '../lib/draw'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { viewActions } from '../redux/reducers/view'


export function Game() {
  // var [state, dispatch] = useStore()
  const view = useAppSelector(state => state.view)
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state)

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!canvasRef.current) return
    setCtx(canvasRef.current.getContext('2d'))
  }, [canvasRef])
  useEffect(() => {
    let frame: number
    const tick = () => {
      frame = requestAnimationFrame(tick)
      if (!ctx) return
      draw(state, ctx)
    }
    tick()
    return () => cancelAnimationFrame(frame)
  }, [state, ctx])

  useEffect(() => {
    dispatch(viewActions.viewCenter)
  }, [dispatch])

  return <div className="relative h-full">
    <ResizeWatcher />
    <KeyController />
    <canvas width={view.widthPx} height={view.heightPx} ref={canvasRef}></canvas>
    <Stats />
  </div>
}