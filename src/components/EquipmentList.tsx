import { equipSlotName, EQUIP_SLOTS } from "../lib/equipment"
import { useAppSelector } from "../redux/hooks"
import { SpriteImg } from "./SpriteImg"


export function EquipmentList() {
  const equipment = useAppSelector(state => state.inventory.equipped)
  return <div className="flex gap-1 flex-wrap">
    {EQUIP_SLOTS.map(slot => {
      const item = equipment[slot]
      // if (!item) return null
      return <div key={slot} className="flex flex-col items-center w-16">
        <div className="w-9 h-9 border p-1">
          {item && <SpriteImg sprite={item} />}
        </div>
        <div className="text-xs text-slate-300">
          {equipSlotName(slot)}
        </div>
      </div>
    })}

  </div>
}