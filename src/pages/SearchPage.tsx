import React from 'react';
import styled from 'styled-components';
import { palette } from '../assets/theme';
import Card from '../components/card';
import SearchBar from '../components/searchBar';
import { useEffect, useState } from 'react';
import { searchArtists } from '../api/dataAPI';
import {
  Link 
} from "react-router-dom";
import { getHashParams } from '../utility';
import ErrorPage from './ErrorPage';
import Loader from '../components/loader';

const SearchParent = styled.div`
  background-color: ${palette.black};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;  
  justify-content: center;
  align-items: center;
  //flex:1;
  min-height: 100%;
`

const SearchResults = styled.div`
  display: grid;
  grid-template-columns: auto auto auto ;
  grid-gap: 20px;
  padding: 10px;
  align-items: stretch;
  /* display: flex;
  flex-wrap: wrap;*/
  align-items: center;
  justify-content: center;
  position: relative;
  //flex-shrink: 1;
  
`

const SearchPage = ({artists}) => {
  const {artistResult,setArtistResult} = artists;
  const [loader, setLoader] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [error, setError] = useState({error: false, message:''});
  
  useEffect(() => {
    const token = getHashParams().access_token;
    sessionStorage.setItem('Token', token);
  /* https://api.spotify.com/v1/search */
  /* BQCVl0qre-_aziZxuzmjfiDL9GiN5y1WoMuE36CLUtH81bJ_FpPsvdWk3FILaMmNdVwpUzS9-Tli4MoTyu_7Ie2gGj2Z3uKLlbXuCGBWY6H3QNi1UgqiDPFZ8jKHMhHfdR0iEwsrvpKF_-_ZIZpoGgNoxUNFIIQ */

  },[]);
  const GetArtists = async (artistName : string) => {
    try {
      setLoader(true);
      const currentData  = await searchArtists(artistName);
      if (currentData) {
        setArtistResult(currentData);
        setLoader(false);
      }

    } catch (e) {
      setError({error: true, message: e.message});
      setLoader(false);
    }


  }
  const handleChange =(event) => {
    setArtistName(event.target.value);
    // console.log(artistName);
    // GetArtists('Drake');
  }
  const ShowArtistCard = () => {
    if (artistResult) {
      // console.log(data);
      return artistResult.data.artists.items.map((artist) => (
        // <Link variant="text" key={artist.id} >
        <Link to={{
          pathname:`/albums/${
            artist.id
          }`,
          state: [{id: artist.id}]
        }} key={artist.id}>
          <Card isArtist title={artist.name} subtitle={artist.followers.total} rating={artist.popularity} image={artist.images[2] ? artist.images[2].url : null}  />
        </Link>
      ))
    }
  }

  const handlePage = () => {

    if(loader){
      return <Loader/> ;
    }else if(error.error){
      return <ErrorPage message={error.message}/>
    }
    else{
        return <><SearchBar placeholder={'Search for an artist ...'} onClick={() => GetArtists(artistName)} handleChange={handleChange} /><SearchResults>
          {ShowArtistCard()}
        </SearchResults></>;
    }
  }


  return (
    <SearchParent>
      {/* {loader ? <SearchIcon sx={{ color: palette.green }} fontSize='large' /> : <SearchBar  placeholder={'Search for an artist ...'} onClick={() => GetArtists(artistName)} handleChange={handleChange} />}
      <SearchResults>
        {ShowArtistCard()}
      </SearchResults> */}
      {handlePage()}
    </SearchParent>
  );
}

export default SearchPage;
