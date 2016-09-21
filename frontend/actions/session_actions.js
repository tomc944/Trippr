import AppDispatcher from '../dispatcher/dispatcher';
import SessionConstants from '../constants/session_constants';
import SessionApiUtil from '../util/session_util';
import ErrorActions from './error_actions';
import { hashHistory } from 'react-router';

const SessionActions = {
  signUp(formData) {
    SessionApiUtil.signUp(
      formData,
      SessionActions.receiveCurrentUser,
      ErrorActions.setErrors
    );
  },
  logIn(formData) {
    SessionApiUtil.logIn(
      formData,
      SessionActions.receiveCurrentUser,
      ErrorActions.setErrors
    );
  },
  logOut(goToLogin) {
    SessionApiUtil.logOut(SessionActions.removeCurrentUser, goToLogin);
  },
  fetchCurrentUser(complete) {
    SessionApiUtil.fetchCurrentUser(
      SessionActions.receiveCurrentUser, complete
    );
  },
  receiveCurrentUser(currentUser) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      currentUser: currentUser
    })
  },
  removeCurrentUser() {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT,
    });
  }
};

module.exports = SessionActions;
