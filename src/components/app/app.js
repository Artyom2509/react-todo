import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';
import ItemStatusFilter from '../item-status-filter';
import './app.css';
import { inject, observer } from 'mobx-react';

export default inject('store')(
	observer(
		class extends Component {
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

			search = (items, term) => {
				if (term.length === 0) {
					return items;
				}

				return items.filter((item) => {
					return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
				});
			};

			render() {
				const { todoData, term, filter } = this.props.store;
				const visibleItems = this.filter(this.search(todoData, term), filter);

				const doneCount = todoData.filter((el) => el.done).length;
				const todoCount = todoData.length - doneCount;

				return (
					<div className="todo-app">
						<AppHeader toDo={todoCount} done={doneCount} />
						<div className="top-panel d-flex">
							<SearchPanel />
							<ItemStatusFilter />
						</div>

						<TodoList todos={visibleItems} />
						<ItemAddForm />
					</div>
				);
			}
		}
	)
);
