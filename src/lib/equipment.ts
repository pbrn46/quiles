
/** Equipment slots. This is in the order of how they are displayed in the stats */
export const EQUIP_SLOTS = [
  "weapon1",
  "head",
  "legs",
  "arms",
  "shoulders",
  "chest",
] as const

export type EquipSlot = typeof EQUIP_SLOTS[number]

const EQUIP_SLOTS_NAME: Record<EquipSlot, string> = {
  "head": "Head",
  "legs": "Legs",
  "arms": "Arms",
  "shoulders": "Shoulders",
  "chest": "Chest",
  "weapon1": "Weapon",
}


/** Returns the friendly display name for the equipement slot */
export function equipSlotName(slot: EquipSlot) {
  return EQUIP_SLOTS_NAME[slot]
}