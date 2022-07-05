import React from 'react'
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home';
import AddTodo from './components/AddTodo/AddTodo'
import TodoDetail from './components/TodoDetail/TodoDetail';

// En este componente deberias cargar tus rutas.
export function App() {
  return (
    <BrowserRouter>
        <Nav />
        <Route exact path='/' component={Home}/>
        <Route path='/add' component={AddTodo}/>
        <Route path='/edit/:id' component={TodoDetail}/>
    </BrowserRouter>
  );
}

export default App;
