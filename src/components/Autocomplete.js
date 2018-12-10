import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";

class LocationSearchInput extends Component {
  constructor() {
    super();
    this.state = {
      address: ""
    };
  }
  
  handleChange = address => {
    this.setState({ address })
    this.props.updateSpecValue(address);
	}

	render() {
		return (
      <PlacesAutocomplete
				value={this.state.address}
				onChange={this.handleChange}
				onSelect={this.handleChange}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div>
						<input
              {...getInputProps({
                id: this.props.id,
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
