// TodoInput.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../Store';

const TodoInput = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim()) {
      addTodo({
        id: Math.random(),
        text: text.trim(),
        completed: false,
      });
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

const mapDispatchToProps = {
  addTodo,
};

export default connect(null, mapDispatchToProps)(TodoInput);
