import loadScript from 'load-script';
import apiKeys from "../data/secrets";

const HOST = "https://maps.googleapis.com/maps/api/js";
const KEY = apiKeys.googlemaps;
const URL = `${HOST}?key=${KEY}&libraries=places`;

const loadGoogleMapApi = (
  success = () => { },
  error = () => { }
) => {
  if (window.google) {
    success();
  } else {
    loadScript(URL, err => {
      const callback = () => err ? error : success;
      callback();
    });
  }
};

export default loadGoogleMapApi;
