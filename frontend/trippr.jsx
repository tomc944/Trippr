import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import App from './components/app';
import PostDetail from './components/posts/post_detail'
import PostIndex from './components/posts/post_index'
import PostForm from './components/posts/post_form'

const Routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Feed} />
			<Route path="posts/:id" component={PostDetail} />
			<Route path="posts"     component={PostIndex} />
			<Route path="posts/new" component={PostForm} />
		</Route>
	</Router>
);

document.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('content');
	if (root) { render(Routes, root); }
});
