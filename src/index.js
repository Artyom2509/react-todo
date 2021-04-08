import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { TodoState } from './state';

const store = new TodoState();

const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
