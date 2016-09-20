import AppDispatcher from '../dispatcher/dispatcher';
import Store from 'flux/utils';
import SessionConstants from '../constants/session_constants';

const SessionStore = new Store(AppDispatcher);

let _currentUser = {};
let _currentUserHasBeenFetched = false;

const _login = currentUser => {
  _currentUser = currentUser;
  _currentUserHasBeenFetched = true;
}

const _logout = () => {
  _currentUser = {};
  _currentUserHasBeenFetched = true;
}

SessionStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.currentUser);
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
      _logout();
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.current_user = () => {
  return Object.assign({}, _currentUser);
};

SessionStore.currentUserHasBeenFetched = () => {
  return !!_currentUserHasBeenFetched;
};

SessionStore.isUserLoggedIn = () => {
  return !!_currentUser.id;
};
