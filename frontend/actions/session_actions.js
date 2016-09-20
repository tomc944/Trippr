import AppDispatcher from '../dispatcher/dispatcher';
import SessionConstants from '../constants/session_constants';
import SessionApiUtil from '../util/session_api_util';
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
  logOut() {
    SessionApiUtil.logOut(SessionActions.removeCurrentUser);
  },
  fetchCurrentUser(complete) {
    SessionApiUtil.fetchCurrentUser(
      SessionActions.receiveCurrentUser, complete)
    )
  }
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
    // TODO: MIGHT BE DEPRECATED
    hashHistory.push("/login")
  }
};

export default SessionActions;
