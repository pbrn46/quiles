import { useAppSelector } from "../redux/hooks"
import { SpriteImg } from "./SpriteImg"


export function ItemList() {
  const bagMaxItems = useAppSelector(state => state.inventory.bags.default.maxItems)
  const bagContents = useAppSelector(state => state.inventory.bags.default.contents)
  const tileSizePx = useAppSelector(state => state.config.tileSizePx)
  return <div>
    <div className="flex flex-wrap gap-1">
      {Array.from(Array(bagMaxItems)).map((v, i) => {
        const item = bagContents[i]
        return <div key={i + "-" + item?.image} className="flex border p-1"
          style={{
            width: tileSizePx + 8,
            height: tileSizePx + 8,
          }}>
          {item && <SpriteImg
            key={i}
            sprite={item.image}
            alt="" />}
        </div>
      })}
    </div>
  </div>
}