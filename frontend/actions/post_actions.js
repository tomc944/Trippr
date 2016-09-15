import AppDispatcher from '../dispatcher/dispatcher';
import PostConstants from '../constants/post_constants';
import PostUtil from '../util/post_util';

const PostActions = {
  fetchPost: (id) => {
    PostUtil.fetchPost(id, PostActions.receivePost);
  },
  fetchPosts: (page) => {
    PostUtil.fetchPosts(page, PostActions.receivePosts, PostActions.allPostsLoaded);
  },
  addPost: (post) => {
    PostUtil.addPost(post, PostActions.receivePost);
  },
  addHighlightToPost: (highlight, firstImage) => {
    PostUtil.addHighlightToPost(highlight, firstImage, PostActions.receiveNewHighlight)
  },
  receivePost: (post) => {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_POST,
      post: post
    });
  },
  allPostsLoaded: () => {
    AppDispatcher.dispatch({
      actionType: PostConstants.ALL_POSTS_LOADED
    })
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
