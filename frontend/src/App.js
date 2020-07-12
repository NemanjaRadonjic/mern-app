import React from 'react';

import { Router, Redirect } from '@reach/router';

import Home from './routes/Home';

import NotFound from './routes/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Redirect from="/" to="/home" noThrow/>
        <Home path="home"/>

        <NotFound default />
      </Router>
    </div>
  );
}

export default App;
