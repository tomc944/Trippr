import React from 'react';
import { render } from 'react-dom';
import ReportsView from './reports_view';
import PostStore from '../../stores/post_store';
import PostActions from '../../actions/post_actions';

const Feed = React.createClass({
  getInitialState() {
    return ({ posts: PostStore.all(), page: 1, areMoreReports: true })
  },
  componentDidMount() {
    this.postToken = PostStore.addListener(this._onChange);
    this.loadNextPage()
  },
  _onChange() {
    this.setState({ posts: PostStore.all(),
                    areMoreReports: PostStore.areMoreReports() })
  },
  loadNextPage() {
    PostActions.fetchPosts(this.state.page)
    this.setState({ page: this.state.page + 1 })
  },
  componentWillUnmount() {
    this.postToken.remove();
  },
  render() {
    return (
      <div classname="index">
        <ReportsView
          posts={this.state.posts}
          loadNextPage={this.loadNextPage}
          areMoreReports={this.state.areMoreReports}
          />
      </div>
    )
  }
})

export default Feed;
