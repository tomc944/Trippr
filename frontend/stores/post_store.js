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

module.exports = PostStore;
