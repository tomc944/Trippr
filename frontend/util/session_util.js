/* TODO: Write cleaner UTIL functions as they are really ugly */

const SessionApiUtil = {
  logIn(user, success, error) {
    const request = $.ajax({
      url: '/authored_api/session',
      method: "POST",
      data: { user: user }
    })
    request.done((user) => {
      success(user);
    })
    request.fail((xhr) => {
      const errors = xhr.responseJSON
      error("signup", errors)
    })
  },
  logOut(success, goToLogin) {
    const request = $.ajax({
      url: '/authored_api/session',
      method: 'DELETE'
    })
    request.done(() => {
      success();
      goToLogin();
    })
  },
  signUp(user, success, error) {
    const request = $.ajax({
      url: '/authored_api/users',
      method: 'POST',
      data: { user: user },
    })
    request.done((user) => {
      success(user)
    })
    request.fail((xhr) => {
      const errors = xhr.responseJSON
      error("signup", errors)
    })
  },
  fetchCurrentUser(success, complete) {
    const request = $.ajax({
      url: '/authored_api/session',
      method: 'GET',
    })
    request.done(() => {
      success();
      complete();
    })
  }
}

export default SessionApiUtil;
