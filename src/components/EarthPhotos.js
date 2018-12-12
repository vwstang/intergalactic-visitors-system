import React, { Component } from "react";
import axios from "axios";
import apiKeys from "../data/secrets";

class EarthPhotos extends Component {
  constructor() {
    super();
    this.state = {
      photoList: []
    };
  }

  constructFlickrURL = objPhoto => {
    const farmID = objPhoto.farm;
    const serverID = objPhoto.server;
    const photoID = objPhoto.id;
    const secret = objPhoto.secret;

    // Flickr URL constructing using photo data as per Flickr documentation
    return `https://farm${farmID}.staticflickr.com/${serverID}/${photoID}_${secret}.jpg`
  }

  getPhotos = () => {
    const apiKey = apiKeys.flickr;
    const apiURL = "https://api.flickr.com/services/rest/";
    const coordsLon = this.props.lng;
    const coordsLat = this.props.lat;

    console.log(coordsLon);
    console.log(coordsLat);

    axios.get(apiURL, {
      params: {
        api_key: apiKey,
        method: "flickr.photos.search",
        format: "json",
        nojsoncallback: 1,
        safe_search: 1,
        extras: "owner_name",
        lat: coordsLat,
        lon: coordsLon,
        per_page: 40
      }
    }).then(res => {
      const urlList = res.data.photos.photo.map(photo => [photo.id, this.constructFlickrURL(photo), photo.title, photo.ownername])
      this.setState({
        photoList: urlList
      })
    });
  }

  componentDidMount() {
    this.getPhotos();
  }

  render() {
    return (
      <section className="gallery">
        <ul className="earthlingPhotos">
          {
            this.state.photoList.map(photo => {
              let attribution;
              photo[2] === "" ? attribution = `Untitled photo by ${photo[3]} on flickr.com` : attribution = `${photo[2]} by ${photo[3]} on flickr.com`;
              return (
                <li key={photo[0]} className="earthlingPhotos-item">
                  <img
                    src={photo[1]}
                    title={attribution}
                    alt={attribution}
                    className="earthlingPhotos-image"
                    style={{ position: "relative", zIndex: "2"}}
                  />
                </li>
              )
            })
          }
        </ul>
      </section>
    )
  }
}

export default EarthPhotos;
