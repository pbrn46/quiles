import React, { useRef, useEffect, useCallback } from 'react'
import { useStore } from '../../store'
import KeyController from '../KeyController';

function Game() {
  var [state] = useStore()
  var canvasRef = useRef()

  const draw = useCallback(() => {
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return
    const hero = state.sprites.hero
    ctx.clearRect(0, 0, state.config.canvas.width, state.config.canvas.height)
    for (let y = 0; y < state.map.height; y++) {
      for (let x = 0; x < state.map.width; x++) {
        var xPx = state.config.tiles.width * x
        var yPx = state.config.tiles.height * y
        ctx.fillStyle = "red"
        if (hero.x === x && hero.y === y)
          ctx.fillStyle = "blue"
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 1
        ctx.fillRect(xPx, yPx, state.config.tiles.width, state.config.tiles.height)
        ctx.strokeRect(xPx, yPx, state.config.tiles.width, state.config.tiles.height)
      }
    }
  }, [state])

  // Run the game
  useEffect(() => {
    window.requestAnimationFrame(draw)
  }, [draw])
  return <>
    <KeyController />
    <canvas width={state.config.canvas.width} height={state.config.canvas.height} ref={canvasRef}></canvas>
  </>
}

export default Game