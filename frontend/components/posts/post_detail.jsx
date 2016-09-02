import React from 'react';
import { render } from 'react-dom';
import PostStore from '../../stores/post_store';
import PostActions from '../../actions/post_actions';

const PostDetail = React.createClass({
  getInitialState() {
    return {
      post: PostStore.find(this.grabId())
    }
  },
  grabId() {
    return parseInt(this.props.params.id)
  },
  componentDidMount() {
    this.postToken = PostStore.addListener(this._onChange);
    PostActions.fetchPost(this.grabId());
  },
  _onChange() {
    this.setState({ post: PostStore.find(this.grabId()) })
  },
  componentWillUnmount() {
    this.postToken.remove();
  },
  render () {
    return (
      <div>
        <h1>{this.state.post.title}</h1>
        <p>{this.state.post.post}</p>
      </div>
    )
  }
});

module.exports = PostDetail;
