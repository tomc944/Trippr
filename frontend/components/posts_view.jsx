import React from 'react';
import { render } from 'react-dom';
import Infinite from 'react-infinite';
import PostIndexItem from './posts/post_index_item';

const PostsView = React.createClass({
  getInitialState() {
    return {
      isInfiniteLoading: false
    }
  },
  renderPosts() {
    const posts = this.props.posts;
    const postKeys = Object.keys(this.props.posts);

    return postKeys.map((key) => {
      let post = posts[key];
      return <PostIndexItem key={key} post={post} />
    })
  },
  handleInfiniteLoad() {
    // this guards in case we are done loading

    /* TODO: Fix the additional call for infinite loading. Right now
    this feature is really buggy */
    
    if (!this.props.areMorePosts) {
      this.setState({ isInfiniteLoading: false })
      return;
    }

    const that = this;

    setTimeout(() => {
      that.props.loadNextPage();
      that.setState({
        isInfiniteLoading: false
      });
    }, 1000);
  },
  elementInfiniteLoading: function() {
    return <div className='loader'>
        Loading...
    </div>
  },
  render() {
    return(
      <Infinite containerHeight={1000} elementHeight={200}
                infiniteLoadBeginEdgeOffset={40}
                onInfiniteLoad={this.handleInfiniteLoad}
                loadingSpinnerDelegate={this.elementInfiniteLoading()}
                isInfiniteLoading={this.state.isInfiniteLoading}
                useWindowAsScrollContainer>
        {this.renderPosts()}
      </Infinite>
    )
  }
})

export default PostsView;
