import React, { useRef, useEffect, useCallback, useState } from 'react'
import { useStore } from '../../store'
import KeyController from '../KeyController';
import { draw } from '../../lib/draw'

// var ticks = 0

function Game() {
  var [state] = useStore()
  var [ctx, setCtx] = useState(null)
  var [ticks, setTicks] = useState(0)
  var canvasRef = useRef()

  useEffect(() => {
    setCtx(canvasRef.current.getContext('2d'))
    console.log("Canvas")
  }, [canvasRef])

  const tick = useCallback(() => {
    draw(state, ctx, ticks)
  }, [state, ctx, ticks])


  // Run the game
  useEffect(() => {
    setTicks(ticks + 1)
    window.requestAnimationFrame(tick)
  }, [tick, ticks])
  return <>
    <KeyController />
    <canvas width={state.config.canvas.width} height={state.config.canvas.height} ref={canvasRef}></canvas>
    <div>
      Power: {state.sprites.hero.power}
    </div>
    <div style={{ display: "none" }}>
      <img src="/assets/giraffe.png"
        id="giraffe" alt="" />
      <img src="/assets/tree.png"
        id="tree" alt="" />
      <img src="/assets/rock.png"
        id="rock" alt="" />
    </div>
  </>
}

export default Game