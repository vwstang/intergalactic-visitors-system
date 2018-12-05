import React, { Component } from 'react';
import './App.scss';

// Import Components
// import Search from "./components/Search.js";
import NASAPhotos from './components/NASAPhotos';

class App extends Component {
	render() {
		return (
			<div className="App">
				{/* <Search /> */}
				<NASAPhotos />
			</div>
		);
	}
}

export default App;
