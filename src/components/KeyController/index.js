import { useEffect } from 'react'
import { useStore } from '../../store';

function KeyController() {
  var [state, dispatch] = useStore()

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e.key)
      switch (e.key) {
        case 'ArrowUp':
          dispatch({type: 'UPDATE_HERO', y: state.sprites.hero.y - 1})
          break
        case 'ArrowDown':
          dispatch({type: 'UPDATE_HERO', y: state.sprites.hero.y + 1})
          break
        case 'ArrowLeft':
          dispatch({type: 'UPDATE_HERO', x: state.sprites.hero.x - 1})
          break
        case 'ArrowRight':
          dispatch({type: 'UPDATE_HERO', x: state.sprites.hero.x + 1})
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