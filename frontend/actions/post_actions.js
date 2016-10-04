import AppDispatcher from '../dispatcher/dispatcher';
import PostConstants from '../constants/post_constants';
import PostUtil from '../util/post_util';

const PostActions = {
  fetchPost: (id) => {
    PostUtil.fetchPost(id, PostActions.receivePost);
  },
  fetchAllPosts: () => {
    PostUtil.fetchAllPosts(PostActions.receiveAllPosts)
  },
  fetchPosts: (page) => {
    PostUtil.fetchPosts(page, PostActions.receivePosts, PostActions.allPostsLoaded);
  },
  addPost: (post, redirectToShow) => {
    PostUtil.addPost(post, PostActions.receivePost, redirectToShow);
  },
  addHighlightToPost: (highlight, firstImage) => {
    PostUtil.addHighlightToPost(highlight, firstImage, PostActions.receiveNewHighlight)
  },
  addPhotoToHighlight: (highlight, image) => {
    PostUtil.addPhotoToHighlight(highlight, image, PostActions.receiveNewPhoto)
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
  receiveAllPosts: (posts) => {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_ALL_POSTS,
      posts: posts
    })
  },
  receiveNewHighlight: (highlight) => {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_NEW_HIGHLIGHT,
      highlight: highlight
    })
  },
  receiveNewPhoto: (photo) => {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVE_NEW_PHOTO,
      photo: photo
    })
  }
}

module.exports = PostActions;
