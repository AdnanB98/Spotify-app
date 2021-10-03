interface UrlParams {
  id: any;
  access_token: string;
}

export const getHashParams = () => {
  const hashParams: UrlParams = {
    access_token: "",
    id: "",
  };
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

export const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  while (text.length <= length) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
