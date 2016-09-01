import React from 'react';
import { render } from 'react-dom';
import Post

const PostDetail = React.createClass({
  getInitialState() {
    return {
      post: PostStore.find(this.props.params.id);
    })
  },
  componentDidMount() {
    this.postToken = PostStore.addListener(this._onChange);
    PostActions.fetchPost();
  },
  _onChange() {
    this.setState({ post: PostStore.find(this.props.params.id)}
  }
  componentWillUnmount() {
    this.postToken.remove();
  },
  render () {
    return (
      <div>
        Here!
      </div>
    )
  }
});

module.exports = PostDetail;
