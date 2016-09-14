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
    request.fail((error) => {
      if (error.status === 422) alert("error")
    })
  },
  addHighlightToPost(highlight, firstImage, successCB) {
    const request = $.ajax({
      url: "/authored_api/posts/" + highlight.post_id + "/highlights",
      method: "POST",
      data: { highlight: highlight,
              first_image: firstImage}
    })
    request.done((highlight) => {
      successCB(highlight)
    })
    request.fail((error) => {
      if (error.status === 422) alert("error")
    })
  }
}

module.exports = PostUtil;
