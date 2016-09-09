import AppDispatcher from '../dispatcher/dispatcher';
import { Store } from 'flux/utils';
import PostConstants from '../constants/post_constants';

const PostStore = new Store(AppDispatcher);
let _posts = {};

PostStore.__onDispatch = (payload) => {
  switch(payload.actionType) {
    case PostConstants.RECEIVE_POST:
      _receivePost(payload.post);
      break;
    case PostConstants.RECEIVE_POSTS:
      _receivePosts(payload.posts);
      break;
    case PostConstants.RECEIVE_NEW_HIGHLIGHT:
      _receiveNewHighlight(payload.highlight);
      break;
  }
}

PostStore.find = (id) => {
  return Object.assign({}, _posts[id]);
}

PostStore.all = () => {
  return Object.assign({}, _posts);
}

const _receivePost = (post) => {
  _posts[post.id] = post;
  PostStore.__emitChange();
}

const _receivePosts = (posts) => {
  _posts = posts;
  PostStore.__emitChange();
}

const _receiveNewHighlight = (highlight) => {
  var post = PostStore.find(highlight.post_id);
  post.highlights.push(highlight);
  post.highlights.sort(function (a, b) {
    if (a.start_idx > b.start_idx) {
      return 1;
    } else if (a.start_idx < b.start_idx) {
      return -1;
    } else {
      return 0;
    }
  });
  PostStore.__emitChange();
}

module.exports = PostStore;
