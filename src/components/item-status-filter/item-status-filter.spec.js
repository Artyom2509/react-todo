import { render, shallow } from 'enzyme';
import React from 'react';
import { ItemStatusFilter } from './item-status-filter';

let store;

describe('render', () => {
	it('snapshot', () => {
		store = { filter: 'all', onFilterChange: () => {} };
		const wrapper = render(<ItemStatusFilter store={store} />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should correct buttons length', () => {
		store = { filter: 'all', onFilterChange: () => {} };
		const wrapper = render(<ItemStatusFilter store={store} />);
		expect(wrapper.children('button').length).toBe(3);
	});
	it('should add button active className', () => {
		store = { filter: 'active', onFilterChange: () => {} };
		const wrapper = shallow(<ItemStatusFilter store={store} />);
		expect(wrapper.childAt(1).hasClass('btn-info')).toBeTruthy();
	});
});

describe('events', () => {
	it('should call onFilterChange', () => {
		const onFilterChange = jest.fn();
		store = { filter: 'all', onFilterChange };
		const wrapper = shallow(<ItemStatusFilter store={store} />);
		wrapper.find('.btn-info').simulate('click');
		expect(onFilterChange).toBeCalled();
	});
});
