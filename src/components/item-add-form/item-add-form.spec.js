import React from 'react';
import { render, shallow } from 'enzyme';
import { ItemAddForm } from './item-add-form';

it('snapshot', () => {
	const wrapper = render(<ItemAddForm />);
	expect(wrapper).toMatchSnapshot();
});

describe('Testing events', () => {
	it('should change state on change event', () => {
		const wrapper = shallow(<ItemAddForm />);
		const input = wrapper.find('.item-add-form input');
		input.simulate('change', { target: { value: 'work' } });
		expect(wrapper.state().label).toEqual('work');
	});
	it('should call function on submit', () => {
		const addItem = jest.fn();
		const wrapper = shallow(<ItemAddForm store={{ addItem }} />);
		const input = wrapper.find('.item-add-form input');
		input.simulate('change', { target: { value: 'work' } });
		wrapper.simulate('submit', { preventDefault: () => {} });
		expect(addItem).toBeCalled();
	});
});
