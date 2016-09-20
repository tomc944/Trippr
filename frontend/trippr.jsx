import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/app';
import Feed from './components/feed';
import PostDetail from './components/posts/post_detail';
import PostForm from './components/posts/post_form';
import LoginForm from './components/login_form';

const Routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Feed} />
			<Route path="login" component={LoginForm} />
			<Route path="signup" component={LoginForm} />
			<Route path="posts/new" component={PostForm} />
			<Route path="posts/:id" component={PostDetail} />
		</Route>
	</Router>
);

document.addEventListener('DOMContentLoaded', () => {
	// add gon gem to handle this
	const root = document.getElementById('content');
	if (root) { render(Routes, root); }
});
