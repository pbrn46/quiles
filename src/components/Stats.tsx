import React from 'react'
import { gameActions } from '../redux/actions'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { spritesSelectors } from '../redux/reducers/sprites'
import { EquipmentList } from './EquipmentList'
import { HeroStats } from './HeroStats'
import { ItemList } from './ItemList'

export function Stats() {
  const dispatch = useAppDispatch()
  const hero = useAppSelector(spritesSelectors.selectHero)
  return <div className="border p-5">
    <div className="row no-gutters">
      <div className="col-6">
        <div className="grid gap-2">
          <HeroStats />
          <EquipmentList />
          <ItemList />
        </div>
      </div>
      <div className="col">
        {hero.hp <= 0 && <div>
          <div className="">
            <div>
              YOU ARE DEAD.
            </div>
            <div>Press <code>r</code> to reset.</div>
            <div>
              <button
                className="btn btn-outline-secondary"
                onClick={e => dispatch(gameActions.resetGame())}>Restart</button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  </div>

}