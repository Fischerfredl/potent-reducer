import React from 'react'
import ReactDOM from 'react-dom'

import { Counter } from './components/Counter'
import { TodoExample } from './components/Todo'

const App = () => {
  return (
    <div>
      <h1>Examples</h1>
      <h2>Counter</h2>
      <Counter />
      <h2>Todo List</h2>
      <TodoExample />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
