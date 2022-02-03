import produce from "immer"
import { Direction } from "../lib/sprite"
import { getItemsAt, getItemsNotAt, heroShouldDie, isPassible, heroIsDead } from "../lib/util"
import { bagsActions } from "./reducers/inventory.bags"
import { equippedActions } from "./reducers/inventory.equipped"
import { spritesActions, spritesSelectors } from "./reducers/sprites"
import { viewActions } from "./reducers/view"
import { appThunk } from "./store"

const moveHero = (direction: Direction) => appThunk((dispatch, getState) => {
  const state = getState()
  if (heroIsDead(state)) return
  const newHero = produce(spritesSelectors.selectHero(getState()), draft => {
    const { x: oldX, y: oldY } = draft
    switch (direction) {
      case Direction.Up:
        draft.y--
        break
      case Direction.Down:
        draft.y++
        break
      case Direction.Left:
        draft.x--
        draft.direction = Direction.Left
        break
      case Direction.Right:
        draft.x++
        draft.direction = Direction.Right
        break
      default:
        break
    }
    if (!isPassible(state, draft.x, draft.y)) {
      draft.x = oldX
      draft.y = oldY
    }
  })
  dispatch(spritesActions.setHero(newHero))
  dispatch(viewActions.viewCenter())

  // Update foes
  const foes = produce(spritesSelectors.selectGroupedSprites(getState())["foe"], draft => {
    draft.forEach(foe => {
      if (Math.floor(Math.random() * 2) !== 0) return foe
      let dx = newHero.x - foe.x
      let dy = newHero.y - foe.y
      let rad = Math.atan2(dx, dy)
      let x = Math.round(Math.sin(rad) * 1) + foe.x
      let y = Math.round(Math.cos(rad) * 1) + foe.y
      if (!isPassible(state, x, y)) {
        return
      }
      foe.x = x
      foe.y = y
    })
  })
  dispatch(spritesActions.setFoes(foes))
  if (heroShouldDie(getState())) {
    dispatch(spritesActions.setHero(
      produce(spritesSelectors.selectHero(getState()), draft => { draft.hp = 0 })
    ))
  }
})

// export function moveHero(state, dispatch, direction) {
//   const hero = { ...state.sprites.hero }
//   if (heroIsDead(state)) return
//   switch (direction) {
//     case 'up':
//       hero.y--
//       break
//     case 'down':
//       hero.y++
//       break
//     case 'left':
//       hero.x--
//       hero.direction = 'left'
//       break
//     case 'right':
//       hero.x++
//       hero.direction = 'right'
//       break
//     default:
//       break
//   }
//   if (!isPassible(state, hero.x, hero.y)) {
//     hero.x = state.sprites.hero.x
//     hero.y = state.sprites.hero.y
//   }
//   const foes = state.sprites.foes.map(foe => {
//     if (Math.floor(Math.random() * 2) !== 0) return foe
//     let dx = hero.x - foe.x
//     let dy = hero.y - foe.y
//     let rad = Math.atan2(dx, dy)
//     let x = Math.round(Math.sin(rad) * 1) + foe.x
//     let y = Math.round(Math.cos(rad) * 1) + foe.y
//     if (!isPassible(state, x, y)) {
//       return foe
//     }
//     return { ...foe, x, y }
//   })
//   dispatch([
//     { type: 'UPDATE_HERO', hero },
//     { type: 'UPDATE_FOES', foes },
//     { type: 'VIEW_CENTER' },
//     (state) => {
//       if (heroShouldDie(state)) {
//         return { type: 'UPDATE_HERO', hero: { ...hero, hp: 0 } }
//       }
//     }])
// }

const getItems = () => appThunk((dispatch, getState) => {
  const state = getState()
  const hero = spritesSelectors.selectHero(state)
  if (heroIsDead(state)) return
  const remainingItems = getItemsNotAt(state, hero.x, hero.y)
  const items = getItemsAt(state, hero.x, hero.y)
  const bagItems = items.filter(item => !item.slot)
  const equipItems = items.filter(item => item.slot)
  dispatch(bagsActions.addBagItems(bagItems))
  dispatch(equippedActions.equipItems(equipItems))
  dispatch(spritesActions.setSprites([
    ...state.sprites.filter(sprite => sprite.type !== "item"),
    ...remainingItems,
  ]))
})

const spitItem = () => appThunk((dispatch, getState) => {
  const state = getState()
  const hero = spritesSelectors.selectHero(state)
  if (heroIsDead(state)) return
  const length = state.inventory.bags.default.contents.length
  if (length === 0) return
  const newBags = produce(state.inventory.bags, draft => {
    draft.default.contents.pop()
  })
  const item = produce(state.inventory.bags.default.contents[length - 1], draft => {
    draft.x = hero.x
    draft.y = hero.y
  })
  const newSprites = produce(state.sprites, draft => {
    draft.push(item)
  })
  dispatch(bagsActions.setBags(newBags))
  dispatch(spritesActions.setSprites(newSprites))
})

const resetGame = () => appThunk((dispatch, getState) => {
  dispatch(equippedActions.reset())
  dispatch(bagsActions.reset())
  dispatch(spritesActions.reset())
  dispatch(viewActions.viewCenter())
})


export const gameActions = {
  moveHero,
  getItems,
  resetGame,
  spitItem,
}