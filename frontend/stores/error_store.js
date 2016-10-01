import { Store } from 'flux/utils';
import AppDispatcher from '../dispatcher/dispatcher';
import ErrorConstants from '../constants/error_constants';

const ErrorStore = new Store(AppDispatcher);

let _errors = {};
let _form   = "";

function _setErrors(payload) {
  _errors = payload.errors;
  _form   = payload.form;
}

function _clearErrors() {
  _errors = {};
  _form   = "";
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

ErrorStore.formErrors = (form) => {
  if (form !== form) {
    return {};
  }

  const result = {};
  for (let field in _errors) {
    result[field] = Array.from(_errors[field]);
  }

  return result;
}

ErrorStore.form = function() {
  return _form;
}

export default ErrorStore;
