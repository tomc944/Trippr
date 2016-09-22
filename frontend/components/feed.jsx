import React from 'react';
import { render } from 'react-dom';
import PostsView from './posts_view';
import PostStore from '../stores/post_store';
import PostActions from '../actions/post_actions';

const Feed = React.createClass({
  getInitialState() {
    return ({ posts: PostStore.all(), page: 1, areMorePosts: true })
  },
  componentDidMount() {
    this.postToken = PostStore.addListener(this._onChange);
  },
  _onChange() {
    this.setState({ posts: PostStore.all(),
                    areMorePosts: PostStore.areMorePosts() })
  },
  loadNextPage() {
    debugger
    PostActions.fetchPosts(this.state.page)
    this.setState({ page: this.state.page + 1 })
  },
  componentWillUnmount() {
    this.postToken.remove();
  },
  render() {
    return (
      <div className="index">
        <PostsView
          posts={this.state.posts}
          loadNextPage={this.loadNextPage}
          areMorePosts={this.state.areMorePosts}
          />
      </div>
    )
  }
})

export default Feed;
