import React from 'react'
import { useStore } from '../../store'
import * as images from '../../lib/images'


function Stats() {
  var [state, dispatch] = useStore()
  const hero = state.sprites.hero
  return (
    <div className="Stats">
      <div className="row no-gutters">
        <div className="col-6">
          <div className="Stats-Left">
            <div>HP: {hero.hp}/{hero.hpMax}</div>
            <div>MP: {hero.mp}/{hero.mpMax}</div>
            <div>Power: {hero.power}</div>
            <div>Items: {state.inventory.bags.default.contents.map((item, i) => (
              <img
                key={i}
                src={images.sprites[item.image].src}
                width={state.config.tileSizePx / 2}
                height={state.config.tileSizePx / 2}
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
                  onClick={e => dispatch([{ type: 'RESET_GAME' }, { type: 'VIEW_CENTER' }])}>Restart</button>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Stats