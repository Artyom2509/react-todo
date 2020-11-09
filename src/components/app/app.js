import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';
import ItemStatusFilter from '../item-status-filter';
import './app.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.maxId = 100;

		this.state = {
			todoData: [
				this.createTodoItem('Drink Coffee'),
				this.createTodoItem('Make Awesome App'),
				this.createTodoItem('Have a lunch'),
			],
			term: '',
			filter: 'all',
		};
	}

	filter(items, filter) {
		switch (filter) {
			case 'all':
				return items;
			case 'active':
				return items.filter((item) => !item.done);
			case 'done':
				return items.filter((item) => item.done);
			default:
				return items;
		}
	}

	togglePropperty(arr, id, propName) {
		let idx = arr.findIndex((el) => el.id === id);

		const oldItem = arr[idx];
		const newItem = { ...oldItem, [propName]: !oldItem[propName] };

		return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
	}

	createTodoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++,
		};
	}

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			let idx = todoData.findIndex((el) => el.id === id);

			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

			return {
				todoData: newArray,
			};
		});
	};

	onToggleImportant = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.togglePropperty(todoData, id, 'important'),
			};
		});
	};

	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.togglePropperty(todoData, id, 'done'),
			};
		});
	};

	addItem = (text) => {
		const newItem = this.createTodoItem(text);

		this.setState(({ todoData }) => {
			const newArray = [...todoData, newItem];

			return {
				todoData: newArray,
			};
		});
	};

	search = (items, term) => {
		if (term.length === 0) {
			return items;
		}

		return items.filter((item) => {
			return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
		});
	};

	onSearchChange = (term) => {
		this.setState({ term });
	};

	onFilterChange = (name) => {
		this.setState({ filter: name });
	};

	render() {
		const { todoData, term, filter } = this.state;
		const visibleItems = this.filter(this.search(todoData, term), filter);

		const doneCount = todoData.filter((el) => el.done).length;
		const todoCount = todoData.length - doneCount;

		return (
			<div className="todo-app">
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel onSearchChange={this.onSearchChange} />
					<ItemStatusFilter
						filter={filter}
						onFilterChange={this.onFilterChange}
					/>
				</div>

				<TodoList
					todos={visibleItems}
					onDeleted={this.deleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone}
				/>
				<ItemAddForm onItemAdd={this.addItem} />
			</div>
		);
	}
}
