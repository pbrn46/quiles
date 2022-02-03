import { useEffect } from "react"
import { Direction } from "../lib/sprite"
import { gameActions } from "../redux/actions"
import { useAppDispatch } from "../redux/hooks"


function KeyController() {
  // var [actions] = useActions()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let preventDefault = true
      console.log(e.key)
      switch (e.key) {
        case 'ArrowUp':
          dispatch(gameActions.moveHero(Direction.Up))
          break
        case 'ArrowDown':
          dispatch(gameActions.moveHero(Direction.Down))
          break
        case 'ArrowLeft':
          dispatch(gameActions.moveHero(Direction.Left))
          break
        case 'ArrowRight':
          dispatch(gameActions.moveHero(Direction.Right))
          break
        case 'g':
          dispatch(gameActions.getItems())
          break
        case 's':
          dispatch(gameActions.spitItem())
          break
        case 'r':
          dispatch(gameActions.resetGame())
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
  }, [dispatch])
  return null
}


export default KeyController