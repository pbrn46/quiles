import React, { useRef, useEffect, useState } from 'react'
import { useStore } from '../../store'
import KeyController from '../KeyController';
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
  const hero = state.sprites.hero
  return <>
    <KeyController />
    <div style={{ display: "none" }}>
      <img src="/assets/giraffe.png"
        id="giraffe" alt="" />
      <img src="/assets/lion.png"
        id="lion" alt="" />
      <img src="/assets/tree.png"
        id="tree" alt="" />
      <img src="/assets/rock.png"
        id="rock" alt="" />
    </div>
    <div className="row">
      <div className="col-6">
        <div>HP: {hero.hp}/{hero.hpMax}</div>
        <div>MP: {hero.mp}/{hero.mpMax}</div>
        <div>Power: {hero.power}</div>
      </div>
      <div className="col">
        {hero.hp <= 0 && <div>
          <div>
            YOU ARE DEAD.
          </div>
          <div>
            <button
              className="btn btn-outline-secondary"
              onClick={e => dispatch({ type: "RESET_GAME" })}>Restart</button>
          </div>
        </div>}
      </div>
    </div>
    <canvas width={state.config.canvas.width} height={state.config.canvas.height} ref={canvasRef}></canvas>
  </>
}

export default Game