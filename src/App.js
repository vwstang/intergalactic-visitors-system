import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';

import Search from "./components/Search";
import Results from "./components/Results";
import NotFound from "./components/NotFound";


class App extends Component {
	render() {
		return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Search} />
          <Route exact path="/results/:name/:lat/:lng" component={Results} />
          <Route component={NotFound} />
        </div>
      </Router>
		);
	}
}

export default App;
