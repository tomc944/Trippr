const PostUtil = {
  fetchPost(id, successCB) {
    $.get("/authored_api/posts/" + id, successCB)
  },
  fetchPosts(successCB) {
    $.get('/authored_api/posts', successCB)
  },
  addPost(post, successCB) {
    const request = $.ajax({
      url: "/authored_api/posts",
      method: "POST",
      data: { post: post }
    })
    request.done((post) => {
      successCB(post)
    })
    request.fail((errors) => {
      if (error.status === 422) alert("error")
    })
  },
  addHighlightToPost(highlight, successCB) {
    const request = $.ajax({
      url: "/authored_api/posts/" + highlight.postId + "/highlights",
      method: "POST",
      data: { highlight: highlight}
    })
    request.done((post) => {
      successCB(post)
    })
    request.fail((errors) => {
      if (error.status === 422) alert("error")
    })
  }
}

module.exports = PostUtil;
