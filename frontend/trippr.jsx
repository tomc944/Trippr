var React 	   = require('react'),
		ReactDom   = require('react-dom'),
		Router     = require('react-router').Router,
		Route      = require('react-router').Route,
		IndexRoute = require('react-router').IndexRoute,
		App        = require('./components/app');


var routes = (
	<Router>
		<Route path="/" component={App}>
		</Route>
	</Router>
);

window.addEventListener('DOMContentLoaded', function() {
	var root = document.getElementById('content');
	if (root) { ReactDOM.render(routes, root); }
});