import { useEffect } from 'react'
import { useStore } from '../../store';

const getItemsAt = (state, xPos, yPos) => {
  return state.sprites.items.filter(item => item.x === xPos && item.y === yPos)
}


function KeyController() {
  var [state, dispatch] = useStore()

  useEffect(() => {
    const handleKeyDown = (e) => {
      var preventDefault = true
      const { x, y, hp, power } = state.sprites.hero
      console.log(e.key)
      switch (e.key) {
        case 'ArrowUp':
          if (hp <= 0) break
          dispatch([
            { type: 'HERO_MOVE', direction: 'up' },
            { type: 'VIEW_CENTER' }])
          break
        case 'ArrowDown':
          if (hp <= 0) break
          dispatch([
            { type: 'HERO_MOVE', direction: 'down' },
            { type: 'VIEW_CENTER' }])
          break
        case 'ArrowLeft':
          if (hp <= 0) break
          dispatch([
            { type: 'HERO_MOVE', direction: 'left' },
            { type: 'VIEW_CENTER' }])
          break
        case 'ArrowRight':
          if (hp <= 0) break
          dispatch([
            { type: 'HERO_MOVE', direction: 'right' },
            { type: 'VIEW_CENTER' }])
          break
        case 'g':
          if (hp <= 0) break
          dispatch({ type: 'HERO_GET_ITEMS', x, y, items: getItemsAt(state, x, y) })
          break
        case 's':
          if (hp <= 0) break
          dispatch({ type: 'HERO_SPIT_TREE', x, y, power })
          break
        default:
          preventDefault = false
      }
      preventDefault && e.preventDefault()
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