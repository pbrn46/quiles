import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

/** Wrapper function. Creates an app thunk while inferring the return type properly */
export const appThunk = <T>(thunk: AppThunk<T>) => thunk
