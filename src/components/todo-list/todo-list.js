import { inject } from 'mobx-react';
import React from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, store }) => {
	const elements = todos.map((item) => {
		const { id, ...itemProps } = item;

		return (
			<li key={id} className="list-group-item">
				<TodoListItem
					{...itemProps}
					onDeleted={() => store.deleteItem(id)}
					onToggleImportant={() => store.onToggleImportant(id)}
					onToggleDone={() => store.onToggleDone(id)}
				/>
			</li>
		);
	});

	return <ul className="list-group todo-list">{elements}</ul>;
};

export default inject('store')(TodoList);
