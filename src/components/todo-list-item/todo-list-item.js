import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {
	render() {
		const {
			label,
			onDeleted,
			onToggleImportant,
			onToggleDone,
			important,
			done,
		} = this.props;

		let classNames = ['todo-list-item'];

		if (important) classNames.push('important');
		if (done) classNames.push('done');

		return (
			<span className={classNames.join(' ')}>
				<span className="todo-list-item-label" onClick={onToggleDone}>
					{label}
				</span>

				<button
					type="button"
					className="btn btn-outline-success btn-sm float-right"
					onClick={onToggleImportant}>
					<i className="fa fa-exclamation" />
				</button>

				<button
					type="button"
					className="btn btn-outline-danger btn-sm float-right"
					onClick={onDeleted}>
					<i className="fa fa-trash-o" />
				</button>
			</span>
		);
	}
}
