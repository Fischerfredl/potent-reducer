import React, { useState, useEffect } from 'react'
import { createStore, makeReducerFn } from '../../src'
import { ReduxProvider } from '../../src/ReduxProvider'

const initialState = { count: 0 }
const reducer = {
  increment: state => ({ count: state.count + 1 }),
  decrement: state => ({ count: state.count - 1 })
}

const { useDispatch, useSelector, Provider } = createStore({
  initialState,
  thunks,
  reducer
})

const reducerFn = makeReducerFn(reducer)
const devTool = window && window.__REDUX_DEVTOOLS_EXTENSION__
const devToolStore = devTool && devTool(reducerFn, initialState)

export const DevToolExample = () => {
  return (
    <ReduxProvider Provider={Provider} store={devToolStore}>
      <Counter />
      <br />
      <div>
        This Counter is connected to ReduxDevTools if it is installed in your
        Browser.
      </div>
    </ReduxProvider>
  )
}

const Counter = () => {
  const { count } = useSelector()
  const { increment, decrement } = useDispatch()
  return (
    <div>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      Count: {count}
    </div>
  )
}
