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
    }, 250);
  },
  elementInfiniteLoading: function() {
    return <div className='loader'>
        Loading...
    </div>
  },
  render() {
    return (
      <div className="feed-container">
        <h1 className="report-title">Welcome to Trippr</h1>
        <p className='explanation'>
          Trippr is a Trip Reporting application for adventurers! Have you
          ever been frustrated by terrible trip reporting formats and bad styling?
          Look no further. Trippr allows users to develop reports, highlighting
          information that should contain reference to photos. Trippr was designed
          to share beta or information amongst fellow adventurers. If you have
          a photo that will help elucidate a report, sign-up and attach a photo
          to a highlight.
        </p>
        <div className="index">
          <Infinite elementHeight={220}
                    containerHeight={window.innerHeight}
                    infiniteLoadBeginEdgeOffset={500}
                    onInfiniteLoad={this.handleInfiniteLoad}
                    loadingSpinnerDelegate={this.elementInfiniteLoading()}
                    isInfiniteLoading={this.state.isInfiniteLoading}
                    timeScrollStateLastsForAfterUserScrolls={500}
                    useWindowAsScrollContainer={true}>
            {this.renderPosts()}
          </Infinite>
        </div>
      </div>
    )
  }
})
export default Feed;
