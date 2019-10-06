import { createStore, combineReducers, applyMiddleware, Middleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducers } from '../reducers'

const middleware: Middleware[] = [thunk]

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger({ collapsed: true }))
}
const middlewareEnhancer = applyMiddleware(...middleware)

const storeEnhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(middlewareEnhancer)
    : middlewareEnhancer

export const store = createStore(combineReducers(reducers), {}, storeEnhancers)

export type IStore = ReturnType<typeof store.getState>
