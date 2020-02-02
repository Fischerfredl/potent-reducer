import React from 'react'
import ReactDOM from 'react-dom'

import { Counter } from './components/Counter'
import { TodoExample } from './components/Todo'
import { DevToolExample } from './components/DevTools'

const App = () => {
  return (
    <div>
      <h1>Examples</h1>
      <h2>Counter</h2>
      <Counter />
      <hr />
      <h2>Todo List</h2>
      <TodoExample />
      <hr />
      <h2>DevTools Example</h2>
      <DevToolExample />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
