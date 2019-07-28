import  { useEffect } from 'react'
import { useStore } from "../../store";
import { generateMap } from '../../lib/mapGenerator'


export default function GameInitializer() {
  var [state, dispatch] = useStore()
  useEffect(() => {
    let map = generateMap(state.map.width, state.map.height)
    dispatch({ type: 'UPDATE_TILES', tiles: map })
  }, [dispatch, state.map.width, state.map.height])

  return null
}