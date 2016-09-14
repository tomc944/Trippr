import AppDispatcher from '../dispatcher/dispatcher';
import PostConstants from '../constants/post_constants';
import PostUtil from '../util/post_util';

const PostActions = {
  fetchPost: (id) => {
    PostUtil.fetchPost(id, PostActions.receivePost);
  },
  fetchPosts: () => {
    PostUtil.fetchPosts(PostActions.receivePosts);
  },
  addPost: (post) => {
    PostUtil.addPost(post, PostActions.receivePost);
  },
  addHighlightToPost: (highlight) => {
    PostUtil.addHighlightToPost(highlight, PostActions.receiveNewHighlight)
  },
  receivePost: (post) => {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_POST,
      post: post
    });
  },
  receivePosts: (posts) => {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_POSTS,
      posts: posts
    })
  },
  receiveNewHighlight: (highlight) => {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_NEW_HIGHLIGHT,
      highlight: highlight
    })
  }
}

module.exports = PostActions;
