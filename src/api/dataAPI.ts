import axios from "axios";

const headers = () => ({
  //Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
});

export const searchArtists = (artistName, limit = 15, offset = 0) => {
  return axios.get("https://api.spotify.com/v1/search", {
    params: {
      q: artistName,
      type: "artist",
      limit,
      offset,
    },
    headers: headers(),
  });
};

export const getAlbums = (artistID, limit = 15, offset = 0) =>
  axios.get(`https://api.spotify.com/v1/artists/${artistID}/albums`, {
    params: {
      limit,
      offset,
    },
    headers: headers(),
  });

export const navPage = (url) => {
  return axios.get(url, {
    headers: headers(),
  });
};
