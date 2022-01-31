import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createSelector } from "reselect"
import { Direction, GroupedSprites, Sprite, SPRITE_TYPES, TypedSprite } from "../../lib/sprite"
import { FOE_TEMPLATE, ITEM_TEMPLATE_FLOWER, ITEM_TEMPLATE_GUN, ITEM_TEMPLATE_TREE, TILE_TEMPLATE_ROCK } from "../stateTemplates"
import { RootState } from "../store"


type SpritesState = Sprite[]

const initialState: SpritesState = [
  {
    type: "hero",
    x: 10,
    y: 10,
    direction: Direction.Left,
    hp: 100,
    hpMax: 100,
    mp: 50,
    mpMax: 50,
    power: 100,
    image: "giraffe"
  },
  { ...FOE_TEMPLATE, x: 12, y: 15, },
  { ...ITEM_TEMPLATE_TREE, x: 5, y: 8, },
  { ...ITEM_TEMPLATE_TREE, x: 5, y: 10, },
  { ...ITEM_TEMPLATE_TREE, x: 2, y: 12, },
  { ...ITEM_TEMPLATE_TREE, x: 3, y: 12, },
  { ...ITEM_TEMPLATE_TREE, x: 4, y: 12, },
  { ...ITEM_TEMPLATE_FLOWER, x: 8, y: 14, },
  { ...ITEM_TEMPLATE_FLOWER, x: 11, y: 11, },
  { ...ITEM_TEMPLATE_GUN, x: 15, y: 9, },
  { ...TILE_TEMPLATE_ROCK, x: 6, y: 9, },
  { ...TILE_TEMPLATE_ROCK, x: 8, y: 9, },
  { ...TILE_TEMPLATE_ROCK, x: 6, y: 10, },
  { ...TILE_TEMPLATE_ROCK, x: 8, y: 10, },
  { ...TILE_TEMPLATE_ROCK, x: 6, y: 11, },
  { ...TILE_TEMPLATE_ROCK, x: 7, y: 11, },
  { ...TILE_TEMPLATE_ROCK, x: 8, y: 11, },
]

const slice = createSlice({
  name: "sprites",
  initialState,
  reducers: {
    setSprites: (state, action: PayloadAction<SpritesState>) => {
      return action.payload
    },
    setHero: (state, action: PayloadAction<TypedSprite<"hero">>) => {
      return [
        ...state.filter(sprite => sprite.type !== "hero"),
        action.payload,
      ]
    },
    setFoes: (state, action: PayloadAction<TypedSprite<"foe">[]>) => {
      return [
        ...state.filter(sprite => sprite.type !== "foe"),
        ...action.payload,
      ]
    },
    reset: () => {
      return initialState
    },
  }
})


const createEmptySpriteGroup = () => {
  return SPRITE_TYPES.reduce((acc, type) => {
    acc[type] = []
    return acc
  }, {} as GroupedSprites)
}

const selectSprites = (state: RootState) => state.sprites
const selectGroupedSprites = createSelector(selectSprites, (sprites) => {
  return sprites.reduce((acc, sprite) => {
    acc[sprite.type].push(sprite as any)
    return acc
  }, createEmptySpriteGroup())
  // return SPRITE_TYPES.reduce((acc, type) => {

  //   return acc
  // }, {} as GroupedSprites)
})

const selectHero = createSelector(selectGroupedSprites, (groupedSprites) => {
  return groupedSprites["hero"][0]
})

export const spritesReducer = slice.reducer
export const spritesActions = slice.actions
export const spritesSelectors = {
  selectSprites,
  selectGroupedSprites,
  selectHero,
}