import * as React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { palette } from '../assets/theme';
import { useEffect } from 'react';

const stateKey = "spotify_auth_state";

const LoginParent = styled.div`
  background-color: ${palette.black};
  height: 100vh;
  
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`
const Header = styled.p`
  color: ${palette.white};
  font-size: 2em;
  font-weight: bold;

`

const LoginPage = () => {

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    document.title = "Login";

  }, []);

  const handleClick = () => {
    const client_id = "b106780740f348ff91f64e23dc8c2054" ;
    const redirect_uri = "http://localhost:3000/artists";
    //const redirect_uri = "https://www.google.com/";
    //const scope = "user-read-private user-read-email";
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
    <LoginParent>
      <Header>SPOTIFY SEARCH</Header>
  <Button variant="contained" onClick={handleClick} style={{backgroundColor:palette.green, fontWeight:'bold', fontSize:'larger', borderRadius:'100px', padding:'15px 15px'}}>LOG IN TO SPOTIFY</Button>
      </LoginParent >     

  );  
}

const generateRandomString = length => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  while (text.length <= length) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default LoginPage;
