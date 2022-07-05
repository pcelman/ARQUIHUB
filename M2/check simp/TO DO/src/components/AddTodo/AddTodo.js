import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/index.js';
import styles from './AddTodo.module.css'
import { Link } from 'react-router-dom';

// Nota 1: Para utilizar el hook `useState` para el manejo de estados de los inputs, tendras que utilizarlo de la siguiente manera
//React.useState

// Nota 2: En este componente tendras que usar la funcion `connect` de react-redux para conectarte al store. 
// Si usas el hook `useDispatch` no funcionaran los test.

export function AddTodo(props) {
  const [state, setState] = React.useState({
    title: '',
    description: '',
    place: '',
    date: ''
  })

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.addTodo(state);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>Title</label>
      <input name='title' onChange={(e) => handleChange(e)}></input>
      <label>Description</label>
      <textarea name='description' onChange={(e) => handleChange(e)}></textarea>
      <label>Place</label>
      <input name='place' onChange={(e) => handleChange(e)}></input>
      <label>Date</label>
      <input name='date' onChange={(e) => handleChange(e)}></input>
      <button>CANCEL</button>
      <button type='submit'>SUBMIT</button>
    </form>
  )
};

function mapStateToProps(state) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: (state) => dispatch(addTodo(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)