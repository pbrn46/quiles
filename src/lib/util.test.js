import * as util from './util'
import { INITIAL_STATE } from '../store/stateTemplates';

describe('loopRowCol', () => {
  it('loops through rows and cols', () => {
    expect(util.mapRowCol(3, 5, (x, y) => {
      return (`${x}_${y}`)
    })).toEqual(
      {
        "0_0": "0_0", "0_1": "0_1", "0_2": "0_2", "0_3": "0_3", "0_4": "0_4",
        "1_0": "1_0", "1_1": "1_1", "1_2": "1_2", "1_3": "1_3", "1_4": "1_4",
        "2_0": "2_0", "2_1": "2_1", "2_2": "2_2", "2_3": "2_3", "2_4": "2_4"
      }
    )
  })
})


it('generates a passible map', () => {
  // TODO
  // let state = INITIAL_STATE
  // console.log(util.getPassibleMap(state))
})