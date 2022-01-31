import React from 'react'
import { sprites } from '../lib/images'
import { gameActions } from '../redux/actions'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { spritesSelectors } from '../redux/reducers/sprites'

export function Stats() {
  const dispatch = useAppDispatch()
  const hero = useAppSelector(spritesSelectors.selectHero)
  const bagContents = useAppSelector(state => state.inventory.bags.default.contents)
  const tileSizePx = useAppSelector(state => state.config.tileSizePx)
  return <div className="Stats">
    <div className="row no-gutters">
      <div className="col-6">
        <div className="Stats-Left">
          <div>HP: {hero.hp}/{hero.hpMax}</div>
          <div>MP: {hero.mp}/{hero.mpMax}</div>
          <div>Power: {hero.power}</div>
          <div>Items: {bagContents.map((item, i) => (
            <img
              key={i}
              src={sprites[item.image].src}
              width={tileSizePx / 2}
              height={tileSizePx / 2}
              alt="" />
          ))}</div>
        </div>
      </div>
      <div className="col">
        {hero.hp <= 0 && <div>
          <div className="Stats-Right">
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