import React from 'react';
import Card from '../../components/card/card';
import SearchBar from '../../components/searchBar/searchBar';
import { useEffect, useState } from 'react';
import { navPage, searchArtists } from '../../api/dataAPI';
import {
  Link,
  useHistory
} from "react-router-dom";
import { getHashParams } from '../../utility';
import ErrorPage from '../ErrorPage/ErrorPage';
import Loader from '../../components/loader/loader';
import './SearchPage.css';
import Navigator from '../../components/navigator/navigator';

const SearchPage = ({ artists, setArtist }) => {
  const { artistResult, setArtistResult } = artists;
  const [loader, setLoader] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(Number.NEGATIVE_INFINITY);
  const history = useHistory();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(15);

  useEffect(() => {
    window.clearTimeout(searchTimeout);
    if (artistName) {
      setSearchTimeout(window.setTimeout(async () => {
        await GetArtists(artistName, 15)
      }, 1000))
    }
  }, [artistName]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [artistResult?.data?.artists?.items]);

  useEffect(() => {
    const token = getHashParams().access_token;
    sessionStorage.setItem('Token', token);
    history.push('/artists');

  }, []);

  const GetArtists = async (artistName: string, limit = 15) => {
    window.clearTimeout(searchTimeout);

    setLoader(true);
    const currentData = await searchArtists(artistName, limit);
    if (currentData) {
      setOffset(currentData.data.artists.offset);
      setLimit(currentData.data.artists.limit);
      setArtistResult(currentData);
      setLoader(false);
    }
  }
  const handleChange = (event) => {
    setArtistName(event.target.value);
  }
  const ShowArtistCard = () => {
    if (artistResult) {
      return artistResult.data.artists.items.map((artist) => (
        <Link className="card" onClick={() => setArtist(artist.name)} to={{
          pathname: `/albums/${artist.id
            }`,
          state: [{ id: artist.id }]
        }} key={artist.id}>
          <Card isArtist title={artist.name} subtitle={artist.followers.total} rating={artist.popularity} image={artist.images[2] ? artist.images[2].url : null} />
        </Link>
      ))
    }
  }

  const Navbar = async (url: string) => {
    if (!url) {
      return;
    }
    setLoader(true);
    const currentData = await navPage(url);
    if (currentData) {
      setOffset(currentData.data.artists.offset);
      setLimit(currentData.data.artists.limit);
      setArtistResult(currentData);
      setLoader(false);

    }
  }

  const handlePage = () => {
    if (loader) {
      return <Loader />;
    }
    else {
      return <><div className="searchResults">
        {ShowArtistCard()}
      </div></>;
    }
  }

  return (
    <div className='searchParent'>
      <SearchBar value={artistName} placeholder={'Search for an artist ...'} onClick={() => GetArtists(artistName)} handleChange={handleChange} />
      {handlePage()}
      {artistResult && artistResult.data.artists.items.length > 0 ? <Navigator nextUrl={artistResult.data.artists.next} prevUrl={artistResult.data.artists.previous} apiCall={Navbar} pageNumber={(offset / limit) + 1} /> : null};
    </div>
  );
}

export default SearchPage;
