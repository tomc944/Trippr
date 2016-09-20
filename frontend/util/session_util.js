const SessionApiUtil = {
  logIn(user, success, error) {
    const request = $.ajax({
      url: '/authored_api/session'
      method: "POST",
      data: { user: user }
    })
    request.done((user) => {
      success(user);
    })
    request.fail(() => {
      error()
    })
  },
  logOut(success) {
    const request = $.ajax({
      url: '/authored_api/session',
      method: 'DELETE'
    }),
    request.done(() => {
      success();
    })
  },
  signUp(user, success, error) {
    const request = $.ajax({
      url: '/authored_api/user',
      method: 'POST',
      data: { user: user },
    })
    request.done((user) => {
      success(error)
    })
    request.fail(() => {
      error()
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
