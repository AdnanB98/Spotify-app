import axios from "axios";

const headers = () => ({
    Authorization: `Bearer ${sessionStorage.getItem('Token')}`
    
});

export const searchArtists =  artistName => {
    
    console.log(headers);
return axios.get('https://api.spotify.com/v1/search', {
    params: {
      q: artistName,
      type: 'artist',
    },
    headers: headers()
});
}


export const getAlbums = artistID =>
    axios.get(`https://api.spotify.com/v1/artists/${artistID}/albums`, {
            headers: headers()
            }
        );