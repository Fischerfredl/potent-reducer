import React, { useState, useEffect } from 'react'

/** Connects a Redux store to this Provider
 * The stores reducer must already be defined.
 * The thunks will be bound to this redux store.
 *
 * This is mainly a utility Component to integrate with ReduxDevTools.
 * If store is undefined the default behavior of the Provider will remain.
 */
export const ReduxProvider = ({ children, store, Provider }) => {
  const [state, setState] = useState(store && store.getState())
  useEffect(() => {
    if (!store) return
    store.subscribe(() => {
      setState(store.getState())
    })
  })
  const props = {
    options: {
      extState: state,
      extDispatch: store && store.dispatch,
    },
  }
  return React.createElement(Provider, props, children)
}
