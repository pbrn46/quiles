import React, { useRef, useEffect, useCallback } from 'react'
import { useStore } from '../../store'
import KeyController from '../KeyController';
import { draw } from './draw'

function Game() {
  var [state] = useStore()
  var canvasRef = useRef()

  const tick = useCallback(() => {
    const ctx = canvasRef.current.getContext('2d')
    draw(state, ctx)
  }, [state])

  // Run the game
  useEffect(() => {
    window.requestAnimationFrame(tick)
  }, [tick])
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