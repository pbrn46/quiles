import { useEffect } from 'react'
import { useStore } from '../../store';

const getItemsAt = (state, xPos, yPos) => {
  return state.sprites.items.filter(item => item.x === xPos && item.y === yPos)
}

const isPassible = (state, x, y) => {
  for (let tile of state.sprites.tiles) {
    if (tile.x === x && tile.y === y) {
      if (!tile.passible) return false
    }
  }
  return true
}

const moveHero = (state, dispatch, x, y) => {
  const hero = state.sprites.hero
  var direction = hero.x === x
    ? hero.direction
    : (hero.x < x ? 'right' : 'left')
  if (isPassible(state, x, y)) {
    dispatch({ type: 'UPDATE_HERO', x, y, direction })
  }
  else {
    dispatch({ type: 'UPDATE_HERO', direction })
  }
}

function KeyController() {
  var [state, dispatch] = useStore()

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { x, y } = state.sprites.hero
      console.log(e.key)
      switch (e.key) {
        case 'ArrowUp':
          moveHero(state, dispatch, x, y - 1)
          break
        case 'ArrowDown':
          moveHero(state, dispatch, x, y + 1)
          break
        case 'ArrowLeft':
          moveHero(state, dispatch, x - 1, y)
          break
        case 'ArrowRight':
          moveHero(state, dispatch, x + 1, y)
          break
        case 'g':
          dispatch({ type: 'HERO_GET_ITEMS', x, y, items: getItemsAt(state, x, y) })
          break
        case 's':
          dispatch({ type: 'HERO_SPIT_TREE', x, y })
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
  }, [state, dispatch])
  return null
}


export default KeyController