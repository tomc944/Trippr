import Store from 'flux/utils';
import AppDispatcher from '../dispatcher/dispatcher';
import ErrorConstants from '../constants/error_constants';

const ErrorStore = new Store(AppdDispatcher);

let _errors = [];
let _form   = "";

function _setErrors(payload) {
  _errors = payload.errors;
  _form   = payload.form;
}

function _clearErrors() {
  _errors = [];
  _form   = ""''
}

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ErrorConstants.SET_ERRORS:
      _setErrors(payload);
      ErrorStore.__emitChange();
      break;
    case ErrorConstants.CLEAR_ERRORS:
      _clearErrors();
      ErrorStore.__emitChange();
      break;
  }
};

ErrorStore.errors = (form) => {
  if (form !== form) {
    return [];
  }

  return _errors.slice();
}

ErrorStore.form = function() {
  return _form;
}

export default ErrorStore;
