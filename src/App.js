import NavBar from './navbar'; 
import Dashboard from './dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeroesView from './heroesView';
import HeroDetails from './heroDetails';
import NotFound from './NotFound';

function App() { 
  return (
    <Router>
      <div className="App">
        <NavBar />  
        <div className="content">
          <Switch> 
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/heroes">
              <HeroesView />
            </Route>
            <Route exact path="/heroes/:id"> 
              <HeroDetails />
            </Route>
            <Route path="*"> 
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
