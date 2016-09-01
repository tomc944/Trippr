import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
		</Route>
	</Router>
);

window.addEventListener('DOMContentLoaded', function() {
	const root = document.getElementById('content');
	if (root) { ReactDOM.render(routes, root); }
});
