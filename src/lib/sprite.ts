import { EquipSlot } from "./equipment"
import { SpriteImageKey } from "./images"

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export type SpriteBase = {
  x: number
  y: number
  image: SpriteImageKey
}


export type SpriteLiving = SpriteBase & {
  direction: Direction
  hp: number
  hpMax: number
  mp: number
  mpMax: number
  power: number
}

export type ItemType = "powerBoost" | "gun"

/** Where the item can be stored */
export type ItemSlot = EquipSlot

export type SpriteItem = SpriteBase & {
  itemType: ItemType
  effects?: {
    power?: number
  }
  slot?: ItemSlot
}

export type SpriteTerrain = SpriteBase & {
  passible: boolean
}

export const SPRITE_TYPES = [
  "hero",
  "item",
  "terrain",
  "foe",
] as const


export type SpriteType = typeof SPRITE_TYPES[number]

export type Sprite = (
  ({ type: "hero" } & SpriteLiving)
  | ({ type: "foe" } & SpriteLiving)
  | ({ type: "item" } & SpriteItem)
  | ({ type: "terrain" } & SpriteTerrain)
)

/** One specific type of sprite */
export type TypedSprite<T extends SpriteType> = Sprite & { type: T }

/** Sprites grouped into arrays of its own type */
export type GroupedSprites = {
  [T in SpriteType]: TypedSprite<T>[]
}