import { inject } from 'mobx-react';
import React, { Component } from 'react';
import './search-panel.css';

export class SearchPanel extends Component {
	state = {
		term: '',
	};

	onSearchChange = (e) => {
		const term = e.target.value;
		this.setState({ term });
		this.props.store.onSearchChange(term);
	};

	render() {
		return (
			<input
				type="text"
				className="form-control search-input"
				placeholder="type to search"
				onChange={this.onSearchChange}
				value={this.state.term}
			/>
		);
	}
}

export default inject('store')(SearchPanel);
