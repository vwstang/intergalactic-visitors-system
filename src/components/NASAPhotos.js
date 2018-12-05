import React, { Component } from "react";
import axios from "axios";

class NASAPhotos extends Component {
    constructor(){
        super();
        this.state = {
            // empty string to store photo URL
            NASAPhoto: ''
        }
    }
    componentDidMount(){
        // ajax request
        axios({
            url: `https://api.nasa.gov/planetary/earth/imagery`,
            method: 'GET',
            dataType: 'json',
            params: {
                lat: '44',
                lon: '79',
                cloud_score: true,
                api_key: 'k5T0oUUDsr2SkUiNU3yy5EMWhK86Ks8MQLcwOz0n'
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
