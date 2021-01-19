import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			label: '',
		};
	}

	onLabelChange = (e) => {
		this.setState({
			label: e.target.value,
		});
	};

	onSubmit = (e) => {
		e.preventDefault();

		if (this.state.label.trim()) {
			this.props.onItemAdd(this.state.label.trim());
			this.setState({
				label: '',
			});
		}
	};

	render() {
		return (
			<form className="item-add-form d-flex" onSubmit={this.onSubmit}>
				<input
					type="text"
					className="form-control"
					onChange={this.onLabelChange}
					placeholder="Whats needs to be done"
					value={this.state.label}
				/>
				<button className="btn btn-outline-secondary">Add Item</button>
			</form>
		);
	}
}
