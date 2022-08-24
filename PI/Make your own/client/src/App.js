import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import CharacterCreate from "./components/CharacterCreate"
import Detail from "./components/Detail"
import NotFound from "./components/NotFound"



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path ="/"component= {LandingPage}/>
        <Route path = "/home" component = {Home}/>
        <Route path = "/character" component = {CharacterCreate}/>
        <Route path = "/pokemon/:id" component = {Detail}/>
        <Route path = "/*" component = {NotFound}/>

      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
