import React from 'react'
import { usePotentReducer } from '../../src'

const initialState = { count: 0 }
const thunks = { increment: () => {}, decrement: () => {} }
const reducer = {
  INCREMENT: state => ({ count: state.count + 1 }),
  DECREMENT: state => ({ count: state.count - 1 })
}

export const Counter = () => {
  const [state, actions] = usePotentReducer({ initialState, thunks, reducer })
  return (
    <>
      <button onClick={actions.decrement}>-</button>
      <button onClick={actions.increment}>+</button>
      Count: {state.count}
    </>
  )
}
