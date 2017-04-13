import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import Home from './Home';
import Submit from './Submit';
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

ReactDOM.render(
<Router>
<div>
    <nav className="navbar navbar-default navbar-static-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Love to Eat</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li><NavLink exact activeClassName="activeNav" to="/">Home</NavLink></li>
              <li><NavLink exact activeClassName="activeNav" to="/submit">Submit a Recipe</NavLink></li>
            
          </ul>
        </div>
      </div>
    </nav>

      <Route exact path="/" component={Home}/>
      <Route path="/submit" component={Submit} history={history}/>
    </div>
  </Router>,
  document.getElementById('root')
);
