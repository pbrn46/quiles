import { useEffect } from 'react'
import useActions from '../../store/actions'


function KeyController() {
  var [actions] = useActions()

  useEffect(() => {
    const handleKeyDown = (e) => {
      var preventDefault = true
      console.log(e.key)
      switch (e.key) {
        case 'ArrowUp':
          actions.moveHero('up')
          break
        case 'ArrowDown':
          actions.moveHero('down')
          break
        case 'ArrowLeft':
          actions.moveHero('left')
          break
        case 'ArrowRight':
          actions.moveHero('right')
          break
        case 'g':
          actions.getItems()
          break
        case 's':
          actions.spitItem()
          break
        case 'r':
          actions.resetGame()
          break
        default:
          preventDefault = false
      }
      preventDefault && e.preventDefault()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [actions])
  return null
}


export default KeyController