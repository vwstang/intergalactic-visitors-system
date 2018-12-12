import React from 'react';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Loading extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		}
	}
	render() {
		return (
			<div className='sweet-loading'>
				<ClipLoader
					className={override}
					sizeUnit={"px"}
					size={150}
					color={'#123abc'}
					loading={this.state.loading}
				/>
			</div>
		)
	}
}

export default Loading;