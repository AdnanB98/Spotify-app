import * as React from 'react';
import Button from '@mui/material/Button';
import { palette } from '../../assets/theme';
import { useEffect } from 'react';
import { generateRandomString } from '../../utility';
import './LoginPage.css';

const stateKey = "spotify_auth_state";

const LoginPage = () => {

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    document.title = "Login";

  }, []);

  const handleClick = () => {
    const client_id = "b106780740f348ff91f64e23dc8c2054";
    const redirect_uri = "http://localhost:3000/artists";
    const state = generateRandomString(16);

    sessionStorage.setItem(stateKey, state);
    let url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += `&client_id=${encodeURIComponent(client_id)}`;
    //url += `&scope=${encodeURIComponent(scope)}`;
    url += `&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    url += `&state=${encodeURIComponent(state)}`;

    console.log(url);

    window.location.href = url;



  };


  return (
    <div className="loginParent">
      <p className="header">SPOTIFY SEARCH</p>
      <Button variant="contained" onClick={handleClick} style={{ backgroundColor: palette.green, fontWeight: 'bold', fontSize: 'larger', borderRadius: '100px', padding: '15px 15px' }}>LOG IN TO SPOTIFY</Button>
    </div >

  );
}

export default LoginPage;
