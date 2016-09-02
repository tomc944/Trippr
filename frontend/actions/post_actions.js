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
  }
}

module.exports = PostActions;
