import React, { useState, useEffect } from 'react'
import { createStore, makeReducerFn } from '../../src'
import { ReduxProvider } from '../../src/ReduxProvider'

const initialState = { count: 0 }
const thunks = { increment: () => {}, decrement: () => {} }
const reducer = {
  INCREMENT: state => ({ count: state.count + 1 }),
  DECREMENT: state => ({ count: state.count - 1 })
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
      <div>
        This Counter is connected to ReduxDevTools if it is installed in your
        Browser.
      </div>
      <Counter />
    </ReduxProvider>
  )
}

const Counter = () => {
  const { count } = useSelector()
  const { increment, decrement } = useDispatch()
  return (
    <>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      Count: {count}
    </>
  )
}
