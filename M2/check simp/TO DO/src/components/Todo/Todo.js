import React from 'react';
import styles from './Todo.module.css';

export function Todo(props) {
  return (
    <div>
      {props.title}
    </div>
  )
};

export default Todo;