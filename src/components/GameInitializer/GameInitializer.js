import React, { useState, useEffect } from 'react'
import { useStore } from "../../store";
import { generateMap } from '../../lib/mapGenerator'



export default function GameInitializer() {
  var [state, dispatch] = useStore()
  // var [tempMap, setTempMap] = useState(null)
  // const width = 100
  // const height = 25
  useEffect(() => {
    // setTempMap(generateMap(width, height))
    let map = generateMap(state.map.width, state.map.height)
    // console.log(map)
    dispatch({ type: 'UPDATE_TILES', tiles: map })
  }, [])

  // if (!tempMap) return null
  // var tempMapComponents = Array(height)
  // for (let y = 0; y < height; y++) {
  //   tempMapComponents[y] = Array(width)
  //   for (let x = 0; x < width; x++) {
  //     tempMapComponents[y][x] = tempMap[x][y]
  //   }
  // }
  return null
  // return (
  //   <div>
  //     <table className="text-center">
  //       <tbody>
  //         {tempMapComponents.map((row, i) => (
  //           <tr key={i}>
  //             {row.map((col, j) => (
  //               <td key={j}>{col || "0"}</td>
  //             ))}
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // )
}