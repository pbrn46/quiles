import { Direction, Sprite } from "../lib/sprite"

export const FOE_TEMPLATE: Sprite = {
  type: "foe",
  x: 0,
  y: 0,
  hp: 100,
  hpMax: 100,
  mp: 50,
  mpMax: 50,
  power: 100,
  image: "lion",
  direction: Direction.Up,
}

export const ITEM_TEMPLATE_TREE: Sprite = {
  type: "item",
  x: 0,
  y: 0,
  itemType: "powerBoost",
  effects: { power: 50 },
  image: 'tree',
}

export const ITEM_TEMPLATE_FLOWER: Sprite = {
  type: "item",
  x: 0,
  y: 0,
  itemType: "powerBoost",
  effects: { power: 25 },
  image: 'flower',
}

export const ITEM_TEMPLATE_GUN: Sprite = {
  type: "item",
  x: 0,
  y: 0,
  itemType: "gun",
  image: 'gun',
  slot: 'weapon1',
}

export const TILE_TEMPLATE_ROCK: Sprite = {
  type: "terrain",
  x: 0,
  y: 0,
  image: 'rock',
  passible: false,
}
