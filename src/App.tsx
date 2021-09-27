import React, {useState} from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import AlbumPage from './pages/AlbumPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


 function App() {
   const [artistResult, setArtistResult] = useState(null);
  return (
    <Router>
        <Switch>
          <Route path="/albums/:id">
            <AlbumPage />
          </Route>
          <Route path="/artists">
            <SearchPage artists={{artistResult, setArtistResult}} />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
