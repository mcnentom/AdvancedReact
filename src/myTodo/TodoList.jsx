// TodoList.js
import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo, deleteTodo } from '../Store';

const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = state => ({
  todos: state,
});

const mapDispatchToProps = {
  toggleTodo,
  deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
