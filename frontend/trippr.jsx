import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/app';
import Feed from './components/feed';
import PostDetail from './components/posts/post_detail';
import PostIndex from './components/posts/post_index';
import PostForm from './components/posts/post_form';

const Routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Feed} />

			<Route path="posts">
				<IndexRoute component={PostIndex} />
				<Route path="new" component={PostForm} />
				<Route path=":id" component={PostDetail} />
			</Route>
		</Route>
	</Router>
);

document.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('content');
	if (root) { render(Routes, root); }
});
