import React, { useState, useRef, useEffect, useCallback } from 'react'

function Game() {
  var [state, setState] = useState({
    level: {
      width: 50,
      height: 30,
    },
    sprites: {
      hero: {
        x: 0,
        y: 0,
      },
    },
    config: {
      game: {
        width: 300,
        height: 200,
      },
      tile: {
        width: 32,
        height: 32,
      },
    },
  })
  var canvasRef = useRef()

  const draw = useCallback(() => {
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return
    const hero = state.sprites.hero
    ctx.clearRect(0, 0, state.config.game.width, state.config.game.height)
    for (let y = 0; y < state.level.height; y++) {
      for (let x = 0; x < state.level.width; x++) {
        var xPx = state.config.tile.width * x
        var yPx = state.config.tile.height * y
        ctx.fillStyle = "red"
        if (hero.x === x && hero.y === y)
          ctx.fillStyle = "blue"
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 1
        // ctx.fillRect(xPx, yPx, state.config.tile.width, state.config.tile.height)
        ctx.fillRect(xPx, yPx, state.config.tile.width, state.config.tile.height)
        ctx.strokeRect(xPx, yPx, state.config.tile.width, state.config.tile.height)
      }
    }
  }, [state])

  // Run the game
  useEffect(() => {
    window.requestAnimationFrame(draw)
  }, [draw])
  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e.key)
      switch (e.key) {
        case 'ArrowUp':
          // state.sprites.hero.y--;
          break
        case 'ArrowDown':
          // state.sprites.hero.y++;
          break
        case 'ArrowLeft':
          // state.sprites.hero.x--;
          break
        case 'ArrowRight':
          // state.sprites.hero.x++;
          break
        default:
      }
    }
    const handleKeyUp = (e) => { }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [state])
  console.log(state)
  return <canvas width={state.config.width} height={state.config.height} ref={canvasRef}></canvas>
}

export default Game