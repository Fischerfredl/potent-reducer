import React, { createContext, useContext, useMemo, useReducer } from 'react'

/** Takes options that fully define a store and turns it into a more potent reducer */
export const usePotentReducer = (options) => {
  const { reducer = {}, thunks = {}, initialState } = options
  const { extState, extDispatch } = options
  const { onUpdate, logging } = options
  const reducerFn = useMemo(
    () => makeReducerFn(reducer, { onUpdate, logging }),
    [reducer, onUpdate, logging]
  )
  const [state, dispatch] = useReducer(reducerFn, initialState)
  const _thunks = useMemo(
    () =>
      bindThunks(
        { ...thunksFromReducerMap(reducer), ...thunks },
        extDispatch || dispatch
      ),
    [thunks, reducer, extDispatch]
  )
  return [extState || state, _thunks]
}

/** Turn a reducerMap to a function
 * A reducerMap is a Javascript object that defines the reducers branches:
 *   - "<action.type>": (state, action) => <newState>
 *   - special key "default": the default branch to take
 * @param {Object} reducerMap: Object definition of a reducer: {<type>: (state, payload) => <newState>}
 * @param {Object} options
 * @returns {Function}: Proper reducer
 */
export function makeReducerFn(reducerMap, options = {}) {
  const { onUpdate, logging } = options
  const noop = (state) => state
  return (prevState, action) => {
    const { type } = action
    const reducerBranch = reducerMap[type] || reducerMap['default'] || noop
    const nextState = reducerBranch(prevState, action)
    const stats = { prevState, nextState, action }
    typeof onUpdate === 'function' && onUpdate(stats)
    if (logging) logger(stats)
    return nextState
  }
}

function thunksFromReducerMap(reducerMap) {
  return Object.fromEntries(Object.keys(reducerMap).map((key) => [key, null]))
}

/** Produces a set of actions that are bound to a specific store
 * The thunks object can contain action creators and/or thunks.
 * - Action creators: args => action
 *   are dispatched directly when called
 * - Thunks args => dispatch => dispatch(action)
 *   are called with dispatch as first argument.
 * The dispatch function will be patched to insert an action type if not given.
 * @param {Object} thunks
 * @param {Function} dispatch
 * @returns {object}
 */
function bindThunks(thunks, dispatch) {
  const boundThunks = {}
  for (let name of Object.keys(thunks)) {
    const defaultType = name
    const patchedDispatch = patchDispatch(dispatch, defaultType)
    boundThunks[name] = (...args) => {
      if (thunks[name] === null) thunks[name] = () => ({})
      const thunk = thunks[name](...args)
      if (typeof thunk === 'function') thunk(patchedDispatch)
      else patchedDispatch(thunk)
    }
  }
  return boundThunks
}

/** Returns a dispatch function that fills in a default type if none is given */
function patchDispatch(dispatch, type) {
  return (action) => dispatch({ type, ...action })
}

/** A ReducerStore Factory that uses React.context
 * Used to make a Store accessible through multiple components
 */
export const createStore = (initialOptions) => {
  const context = createContext(null)
  const { Consumer } = context
  const Provider = ({ children, options }) => {
    const store = usePotentReducer({ ...initialOptions, ...options })
    return React.createElement(context.Provider, { value: store }, children)
  }
  const useStore = () => useContext(context)
  const useSelector = (selector) => {
    const [state] = useContext(context)
    if (typeof selector === 'undefined') return state
    const val = selector(state)
    initialOptions.warnOnUndefinedSelect && assertSelectedExists(val)
    return val
  }
  const useDispatch = () => useContext(context)[1]
  return { Provider, Consumer, useStore, useSelector, useDispatch }
}

function assertSelectedExists(value) {
  if (typeof value !== 'undefined') return
  console.warn(`A selector returned undefined.
This indicates that you tried to access a state property that does not exist.
To turn these messages off use {"warnOnUndefinedSelect": false} in options`)
  console.groupCollapsed('Trace')
  console.trace()
  console.groupEnd()
}

/** Log action inspired by redux-logger */
const logger = ({ prevState, action, nextState }) => {
  const css = (color) => `color: ${color}; font-weight: bold;`
  console.groupCollapsed(`%c action`, 'color: #9E9E9E', action.type)
  console.log('%c prevState ', css('#9E9E9E'), prevState)
  console.log('%c action    ', css('#03A9F4'), action)
  console.log('%c nextState ', css('#4CAF50'), nextState)
  console.groupEnd()
}
