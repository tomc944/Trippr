import React from 'react';
import { render } from 'react-dom';
import PostStore from '../stores/post_store';
import PostActions from '../actions/post_actions';
import Infinite from 'react-infinite';
import PostIndexItem from './posts/post_index_item';

const Feed = React.createClass({
  getInitialState() {
    return ({ posts: PostStore.all(), page: 1,
              areMorePosts: true, isInfiniteLoading: false })
  },
  componentDidMount() {
    this.postToken = PostStore.addListener(this._onChange);
  },
  _onChange() {
    this.setState({ posts: PostStore.all(),
                    areMorePosts: PostStore.areMorePosts(),
                    isInfiniteLoading: false });
  },
  loadNextPage() {
    PostActions.fetchPosts(this.state.page);
    this.setState({ page: this.state.page + 1 });
  },
  componentWillUnmount() {
    this.postToken.remove();
  },
  renderPosts() {
    const posts = this.state.posts;
    const postKeys = Object.keys(this.state.posts);

    return postKeys.map((key) => {
      let post = posts[key];
      return <PostIndexItem key={key} post={post} />
    })
  },
  handleInfiniteLoad() {
    this.setState({
      isInfiniteLoading: true
    })

    if (!this.state.areMorePosts) {
      this.setState({ isInfiniteLoading: false })
      return;
    }

    const that = this;

    setTimeout(() => {
      that.loadNextPage();
    }, 1000);
  },
  elementInfiniteLoading: function() {
    return <div className='loader'>
        Loading...
    </div>
  },
  render() {
    return (
      <div className="index">
        <Infinite elementHeight={200}
                  containerHeight={window.innerHeight}
                  infiniteLoadBeginEdgeOffset={200}
                  onInfiniteLoad={this.handleInfiniteLoad}
                  loadingSpinnerDelegate={this.elementInfiniteLoading()}
                  isInfiniteLoading={this.state.isInfiniteLoading}
                  timeScrollStateLastsForAfterUserScrolls={2000}
                  useWindowAsScrollContainer={true}>
          {this.renderPosts()}
        </Infinite>
      </div>
    )
  }
})
export default Feed;
