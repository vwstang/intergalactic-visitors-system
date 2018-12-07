import React, { Component } from "react";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng
} from "react-places-autocomplete";

class LocationSearchInput extends Component {
  constructor() {
    super();
    this.state = {
      address: ""
    }
  }

  handleChange = address => {
    this.setState({ address });
    this.props.updateSpecValue(address);
	}

	handleSelect = address => {
		geocodeByAddress(address)
      .then(results => {
        this.setState({ address: results[0].formatted_address });
        return getLatLng(results[0])
      })
      .then(latLng => {
        this.props.updateSpecValue(this.state.address, latLng);
      })
      .catch(error => console.error('Error', error));
	}

	render() {
		return (
      <PlacesAutocomplete
				value={this.state.address}
				onChange={this.handleChange}
				onSelect={this.handleSelect}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div>
						<input
							{...getInputProps({
								placeholder: 'Search by Place',
                className: 'location-search-input',
                disabled: this.props.isDisabled("specValue")
							})}
						/>
						<div className="autocomplete-dropdown-container">
							{loading && <div>Loading...</div>}
							{suggestions.map(suggestion => {
								const className = suggestion.active
									? 'suggestion-item--active'
									: 'suggestion-item';
								// inline style for demonstration purpose
								const style = suggestion.active
									? { cursor: 'pointer' }
									: { cursor: 'pointer' };
								return (
									<div
										{...getSuggestionItemProps(suggestion, {
											className,
											style,
										})}
									>
										<span>{suggestion.description}</span>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		)
	}
}

export default LocationSearchInput;
