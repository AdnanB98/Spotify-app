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
import Navigator from '../../components/navigatior/navigator';

const SearchPage = ({ artists }) => {
  const { artistResult, setArtistResult } = artists;
  const [loader, setLoader] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [error, setError] = useState({ error: false, message: '' });
  const [searchTimeout, setSearchTimeout] = useState(Number.NEGATIVE_INFINITY);
  const history = useHistory();

  useEffect(() => {
    window.clearTimeout(searchTimeout);
    if (artistName) {
      setSearchTimeout(window.setTimeout(async () => {
        await GetArtists(artistName, 15)
      }, 2000))
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
    try {
      setLoader(true);
      const currentData = await searchArtists(artistName, limit);
      if (currentData) {
        setArtistResult(currentData);
        setLoader(false);
      }

    } catch (e) {
      setError({ error: true, message: e.message });
      setLoader(false);
    }


  }
  const handleChange = (event) => {
    setArtistName(event.target.value);
  }
  const ShowArtistCard = () => {
    if (artistResult) {
      return artistResult.data.artists.items.map((artist) => (
        <Link className="card" to={{
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
    try {
      setLoader(true);
      const currentData = await navPage(url);
      if (currentData) {
        setArtistResult(currentData);
        setLoader(false);
      }

    } catch (e) {
      setError({ error: true, message: e.message });
      setLoader(false);
    }
  }

  const handlePage = () => {
    if (loader) {
      return <Loader />;
    } else if (error.error) {
      return <ErrorPage message={error.message} />
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
      {artistResult ? <Navigator nextUrl={artistResult.data.artists.next} prevUrl={artistResult.data.artists.previous} apiCall={Navbar} /> : null};
    </div>
  );
}

export default SearchPage;
