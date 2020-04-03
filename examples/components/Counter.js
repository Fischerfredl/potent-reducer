import React from 'react'
import { usePotentReducer } from '../../src'

const initialState = { count: 0 }
const reducer = {
  INCREMENT: (state) => ({ count: state.count + 1 }),
  DECREMENT: (state) => ({ count: state.count - 1 }),
}

export const Counter = () => {
  const [state, actions] = usePotentReducer({ initialState, reducer })
  return (
    <>
      <button onClick={actions.DECREMENT}>-</button>
      <button onClick={actions.INCREMENT}>+</button>
      <span>Count: {state.count}</span>
    </>
  )
}
