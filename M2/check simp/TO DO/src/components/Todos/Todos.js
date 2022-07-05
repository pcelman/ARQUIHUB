import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Todo from '../Todo/Todo';

import styles from './Todos.module.css'

export function Todos(props) {
  return (
    <div className={styles.todos}>
      <span>{props.status}</span>
        {
          props.state && props.state.map(todo => todo.status === props.status 
          ? <Link key={todo.id} to={`/edit/${todo.id}`}>
              <Todo key={todo.id} title={todo.title} status={props.status}></Todo>
            </Link> 
          : null)
        }
    </div>
  )
};

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(Todos);