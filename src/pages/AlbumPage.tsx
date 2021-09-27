import React, { useEffect } from 'react'
import styled from 'styled-components';
import Card from '../components/card';
import { useState } from 'react';
import { getAlbums } from '../api/dataAPI';
import {
useParams
} from "react-router-dom";
import Loader from '../components/loader';
import ErrorPage from './ErrorPage';

const AlbumResults = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 20px;
  padding: 10px;
  align-items: stretch;
  /* display: flex;
  flex-wrap: wrap;*/
  //align-items: center;
  justify-content: center;
`

const AlbumPage = (props) => {
    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);
    const {id} = useParams();
    const [error, setError] = useState({error: false, message:''});


    const GetAlbums = async () => {
        try {
          setLoader(true);
          const currentData = await getAlbums(id);
          if (currentData) {
            setData(currentData);
            setLoader(false);
    
          }
    
        } catch (e) {
          setError({error: true, message: e.message});
          setLoader(false);
        }
    
    
    }
    useEffect(()=>{

        GetAlbums();
        
        },[]);

    const ShowAlbumCard = () => {

        if (data) {
          return data.data.items.map((album) => (
            <Card key ={album.id} isArtist={false} title={album.name} subtitle={album.artists[0].name} albumReleaseDate={album.release_date} 
            numberOfTracks={album.total_tracks} image={album.images[1].url} previewLink={album.external_urls.spotify}/>
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
            return <div>
                      <div style ={{color: 'white' , padding: '10px 100px 10px 100px'}}>
                        <h1>{data && data.data.items[0].artists[0].name}</h1>
                        <h2 >Albums</h2>
                      </div>
                      <AlbumResults>
                        {ShowAlbumCard()}
                      </AlbumResults>
                    </div>;
        }
      }

    return (
        // <div>
        //   <div style ={{color: 'white' , padding: '10px 100px 10px 100px'}}>
        //   <h1>{data && data.data.items[0].artists[0].name}</h1>
        //   <h2 >Albums</h2>
        //   </div>
        //     <AlbumResults>
        //         {ShowAlbumCard()}
        //     </AlbumResults>
        // </div>
        <>{handlePage()}</>
    )
}



export default AlbumPage

