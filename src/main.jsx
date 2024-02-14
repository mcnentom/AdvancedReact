import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import store from './app/Store'
import store from './Store.jsx' 
import { Provider } from 'react-redux'
import './index.css'
import TodoList from './myTodo/TodoList.jsx'
import TodoInput from './myTodo/TodoInput.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <App /> */}
    <TodoList/>
    <TodoInput/>
  </Provider>,
)
