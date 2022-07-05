import React from 'react';
import Todos from '../Todos/Todos';
import styles from './Home.module.css'

export function Home() {
  return (
    <div className={styles.flex}>
      <Todos status="Todo"/>
      <Todos status="InProgress"/>
      <Todos status="Done"/>
    </div>
  )
};

export default Home;