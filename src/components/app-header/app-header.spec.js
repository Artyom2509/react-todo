import React from 'react';
import { mount, render, shallow } from 'enzyme';
import AppHeader from './app-header';

const component = shallow(<AppHeader toDo={3} done={5} />);

it('snapshot check', () => {
  const component = render(<AppHeader toDo={3} done={5} />)
	expect(component).toMatchSnapshot();
});

it('should render props correctly', () => {
	expect(component.find('.app-header h2').text()).toMatch(
		'3 more to do, 5 done'
	);
});
it('should render title', () => {
	expect(component.find('.app-header h1').text()).toMatch('Todo List');
});
