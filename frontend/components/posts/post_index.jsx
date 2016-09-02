import React from 'react';
import { render } from 'react-dom';
import Infinite from 'react-infinite';
import PostIndexItem from './post_index_item';
import PostStore from '../../stores/post_store';
import PostActions from '../../actions/post_actions';

const PostIndex = React.createClass({
  getInitialState() {
    return ({ posts: PostStore.all() })
  },
  componentDidMount() {
    PostActions.fetchPosts()
    this.postToken = PostStore.addListener(this._onChange);
  },
  _onChange() {
    this.setState({ posts: PostStore.all() })
  },
  componentWillUnmount() {
    this.postToken.remove();
  },
  displayPosts() {
    const postKeys = Object.keys(this.state.posts)

    return (postKeys.map((key) => {
      return (<PostIndexItem key={key} post={this.state.posts[key]} />)
    }))
  },
  render() {
    return (
      <div>
        Post Index
        <Infinite containerHeight={200} elementHeight={40}>
          {this.displayPosts()}
        </Infinite>
      </div>
    )
  }
})

export default PostIndex
