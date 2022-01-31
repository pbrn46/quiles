// import React, { useReducer, createContext, useContext } from 'react'

// import viewReducer from './reducers/view'
// import spritesReducer from './reducers/sprites'
// import inventoryReducer from './reducers/inventory'
// import { INITIAL_STATE } from './stateTemplates'


// var context = createContext(null)

// function reducer(state, action) {
//   if (Array.isArray(action)) {
//     let newState = state
//     for (let subAction of action) {
//       newState = reducer(newState, subAction)
//     }
//     return newState
//   }
//   if (typeof action === "function") {
//     return reducer(state, action(state))
//   }
//   if (action === undefined) {
//     return state
//   }
//   switch (action.type) {
//     case 'RESET_GAME':
//       let resetState = {...INITIAL_STATE}
//       resetState.view.widthPx = state.view.widthPx
//       resetState.view.heightPx = state.view.heightPx
//       return resetState
//     default:
//       break
//   }
//   return {
//     ...state,
//     view: viewReducer(state.view, action, state),
//     sprites: spritesReducer(state.sprites, action, state),
//     inventory: inventoryReducer(state.inventory, action, state),
//   }
// }

// export function StoreProvider({ children }) {
//   var [state, dispatch] = useReducer(reducer, INITIAL_STATE)
//   return (<context.Provider value={[state, dispatch]}>{children}</context.Provider>)
// }

// export function useStore() {
//   var [state, dispatch] = useContext(context)
//   return [state, dispatch]
// }
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType> = ThunkAction<ReturnType, RootState, unknown, Action>

/** Creates an app thunk while inferring the return type properly */
export const appThunk = <T>(thunk: AppThunk<T>) => thunk
