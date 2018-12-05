import React, { Component } from "react";
import axios from "axios";
import apiKeys from "../data/secrets";

class NASAPhotos extends Component {
    constructor(){
        super();
        this.state = {
            // empty string to store photo URL
            NASAPhoto: ""
        }
    }
  
    componentDidMount(){
        // axios request
        axios({
            url: `https://api.nasa.gov/planetary/earth/imagery`,
            method: 'GET',
            dataType: 'json',
            params: {
                lat: this.props.lat,
                lon: this.props.lng,
                cloud_score: true,
                api_key: apiKeys.nasa
            }
        }).then((response) => {
            this.setState({
                // store photo URL in state
                NASAPhoto: response.data.url
            })
        })
    }
  
    render(){
        return(
            <img src={this.state.NASAPhoto} alt=""/>
        )
    }
}

export default NASAPhotos
