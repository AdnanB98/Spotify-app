import React, { useEffect } from 'react'
import Card from '../../components/card/card';
import { useState } from 'react';
import { getAlbums, navPage } from '../../api/dataAPI';
import {
  useParams
} from "react-router-dom";
import Loader from '../../components/loader/loader';
import ErrorPage from '../ErrorPage/ErrorPage';
import './AlbumPage.css';
import Navigator from '../../components/navigator/navigator'

const AlbumPage = (props) => {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [error, setError] = useState({ error: false, message: '' });


  const GetAlbums = async () => {
    try {
      setLoader(true);
      const currentData = await getAlbums(id, 15);
      if (currentData) {
        setData(currentData);
        setLoader(false);

      }

    } catch (e) {
      setError({ error: true, message: e.message });
      setLoader(false);
    }


  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [data?.data?.items]);

  useEffect(() => {
    GetAlbums();
  }, []);

  const ShowAlbumCard = () => {

    if (data) {
      return data.data.items.map((album) => (
        <div className='card' key={album.id}>
          <Card isArtist={false} title={album.name} subtitle={album.artists[0].name} albumReleaseDate={album.release_date}
            numberOfTracks={album.total_tracks} image={album.images[1].url} previewLink={album.external_urls.spotify} />
        </div>
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
        setData(currentData);
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
      return <div>
        <div style={{ color: 'white', padding: '10px 100px 10px 100px' }}>
          <h1>{data && data.data.items[0].artists[0].name}</h1>
          <h2 >Albums</h2>
        </div>
        <div className="albumResults">
          {ShowAlbumCard()}
        </div>
      </div>;
    }
  }

  return (
    <>{handlePage()}
      {data ? <Navigator nextUrl={data.data.next} prevUrl={data.data.previous} apiCall={Navbar} /> : null}
    </>

  )
}



export default AlbumPage

