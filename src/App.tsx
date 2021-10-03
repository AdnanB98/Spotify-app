import React, { useState } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage';
import AlbumPage from './pages/AlbumPage/AlbumPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from 'axios';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { error } from 'console';
//Move interceptor here to have visibility: on error state;
//Remove error, set error from all children
//remove if error render error pages
//render error page above switch inside Router
//pass error state as prop
//interceptor set error = e.message and open = true



function App() {
  const [artistResult, setArtistResult] = useState(null);
  const [error, setError] = useState(null);
  const [errorState, setErrorState] = useState(false);
  const [artist, setArtist] = useState(null);

  axios.interceptors.response.use(
    (response) => response,
    (error) => errorHandler(error)
  );
  const errorHandler = (error) => {
    setError(error.message);
    setErrorState(true);
    return Promise.reject(error);
  };
  return (
    <Router>
      <ErrorPage state={errorState} errorMessage={error} setState={setErrorState} />
      <Switch>
        <Route path="/albums/:id">
          <AlbumPage artist={artist} />
        </Route>
        <Route path="/artists">
          <SearchPage artists={{ artistResult, setArtistResult }} setArtist={setArtist} />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
