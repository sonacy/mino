import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import appState, { TAppState } from './appState'

export interface IStore {
  appState: TAppState
}

export default function configureStore(preloadedState?: any) {
  return createStore(
    combineReducers({
      appState,
    }),
    preloadedState,
    composeWithDevTools()
  )
}
