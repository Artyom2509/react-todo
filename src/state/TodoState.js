import { makeAutoObservable } from 'mobx';

export class TodoState {
	maxId = 100;
	todoData = [];
	term = '';
	filter = 'all';

	constructor() {
		makeAutoObservable(this);

		this.todoData = [
			this.createTodoItem('Drink Coffee'),
			this.createTodoItem('Make Awesome App'),
			this.createTodoItem('Have a lunch'),
		];
	}

	createTodoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++,
		};
	}

	addItem = (text) => {
		const newItem = this.createTodoItem(text);
		this.todoData.push(newItem);
	};

	deleteItem = (id) => {
		const idx = this.todoData.findIndex((el) => el.id === id);
		this.todoData.splice(idx, 1);
	};

	onSearchChange = (term) => {
		this.term = term;
	};

	onFilterChange = (name) => {
		this.filter = name;
	};

	onToggleImportant = (id) => {
		const idx = this.todoData.findIndex((el) => el.id === id);
		const newItem = { ...this.todoData[idx] };
		newItem.important = !newItem.important;
		this.todoData.splice(idx, 1, newItem);
	};

	onToggleDone = (id) => {
		const idx = this.todoData.findIndex((el) => el.id === id);
		this.todoData[idx].done = !this.todoData[idx].done;
	};
}
