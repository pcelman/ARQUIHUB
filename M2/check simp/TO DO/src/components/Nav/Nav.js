import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Nav.module.css'

export function Nav() {
  return (
    <nav className={`${styles.flex}`}>
      <Link to='/'><h3>TODOS</h3></Link>
      <Link to='/add'><h3>Add Todo</h3></Link>
    </nav>
  )
};

export default Nav;