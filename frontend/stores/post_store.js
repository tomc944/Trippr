import AppDispatcher from '../dispatcher/dispatcher';
import { Store } from 'flux/utils';
import PostConstants from '../constants/post_constants';

const PostStore = new Store(AppDispatcher);
let _posts = {};
let _areMorePosts = true;

PostStore.__onDispatch = (payload) => {
  switch(payload.actionType) {
    case PostConstants.RECEIVE_POST:
      _receivePost(payload.post);
      PostStore.__emitChange();
      break;
    case PostConstants.RECEIVE_POSTS:
      _addPosts(payload.posts);
      PostStore.__emitChange();
      break;
    case PostConstants.RECEIVE_NEW_HIGHLIGHT:
      _receiveNewHighlight(payload.highlight);
      PostStore.__emitChange();
      break;
    case PostConstants.RECEIVE_NEW_PHOTO:
      _receiveNewPhoto(payload.photo);
      PostStore.__emitChange();
      break;
    case PostConstants.ALL_POSTS_LOADED:
      _areMorePosts = false;
      PostStore.__emitChange();
      break;
  }
}

PostStore.areMorePosts = () => {
  return _areMorePosts;
}

PostStore.find = (id) => {
  return Object.assign({}, _posts[id]);
}

PostStore.all = () => {
  return Object.assign({}, _posts);
}

const _receivePost = (post) => {
  _posts[post.id] = post;
}


const _addPosts = (posts) => {
  posts.forEach((post) => {
    _addPost(post)
  })
}

const _addPost = (post) => {
  _posts[post.id] = post;
}

const _receiveNewHighlight = (highlight) => {
  var post = PostStore.find(highlight.post_id);
  post.highlights.push(highlight);
}

const _receiveNewPhoto = (photo) => {
  var post = PostStore.find(photo.post_id);
  var highlight_ids = photo.highlights.map(function(highlight) {
    return highlight.id});
  post.highlights.forEach(function(highlight) {
    if (highlight_ids.includes(highlight.id)) {
      highlight.photos.push(photo);
    }
  })
}

module.exports = PostStore;
