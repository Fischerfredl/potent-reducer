import React, { useState } from 'react'
import { createStore } from '../../src'

const initialState = {
  nextId: 0,
  items: [],
  done: new Set()
}

const selectors = {
  $done: state => state.items.filter(({ id }) => state.done.has(id)),
  $undone: state => state.items.filter(({ id }) => !state.done.has(id))
}

const thunks = {
  addItem: title => ({ title }),
  removeItem: id => ({ id }),
  addDone: id => ({ id }),
  removeDone: id => ({ id })
}

const reducer = {
  ADD_ITEM: (state, { title }) => ({
    ...state,
    nextId: state.nextId + 1,
    items: [...state.items, { title, id: state.nextId }]
  }),
  REMOVE_ITEM: (state, { id }) => ({
    ...state,
    items: state.items.filter(item => item.id !== id)
  }),
  ADD_DONE: (state, { id }) => ({
    ...state,
    done: new Set([...state.done, id])
  }),
  REMOVE_DONE: (state, { id }) => ({
    ...state,
    done: new Set([...state.done].filter(doneId => doneId !== id))
  })
}

const { Provider, useSelector, useDispatch } = createStore({
  initialState,
  reducer,
  thunks,
  logging: true
})

export const TodoExample = () => {
  return (
    <Provider>
      <AddItem />
      <UndoneList />
      <DoneList />
      <br />
      This example uses the logging flag to enable debugging in the console.
    </Provider>
  )
}

const AddItem = () => {
  const [text, setText] = useState('')
  const { addItem } = useDispatch()
  const handleSubmit = evt => {
    evt.preventDefault()
    addItem(text)
    setText('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={evt => setText(evt.target.value)} />
      <button type="submit">Add</button>
    </form>
  )
}

const UndoneList = () => {
  const items = useSelector(selectors.$undone)
  const { addDone } = useDispatch()
  return (
    <div>
      <h3>Undone Tasks</h3>
      <ul>
        {items.map(({ id }) => (
          <li key={id}>
            <button onClick={() => addDone(id)}>Done</button>
            <TodoItem id={id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const DoneList = () => {
  const items = useSelector(selectors.$done)
  const { removeDone } = useDispatch()
  return (
    <div>
      <h3>Done Tasks</h3>
      <ul>
        {items.map(({ id }) => (
          <li key={id}>
            <button onClick={() => removeDone(id)}>Undone</button>
            <TodoItem id={id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const TodoItem = ({ id }) => {
  const { title } = useSelector(state => state.items.find(el => el.id === id))
  const { removeItem } = useDispatch()
  return (
    <>
      <button onClick={() => removeItem(id)}>❌</button>
      <span> {title}</span>
    </>
  )
}
