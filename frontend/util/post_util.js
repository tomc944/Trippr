/* TODO: Write cleaner UTIL functions as they are really ugly */

const PostUtil = {
  fetchPost(id, successCB) {
    $.get("/authored_api/posts/" + id, successCB)
  },
  fetchPosts(pageNum, successCB, failureCB) {
    const request = $.ajax({
      url: '/authored_api/posts/by_page/' + pageNum,
      method: "GET"
    })
    request.done((posts) => {
      successCB(posts);
    })
    request.fail(() => {
      failureCB();
    })
  },
  addPost(post, successCB, redirectToShow) {
    const request = $.ajax({
      url: "/authored_api/posts",
      method: "POST",
      data: { post: post }
    })
    request.done((post) => {
      successCB(post)
      redirectToShow(post.id)
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
  },
  addPhotoToHighlight(highlight, image, successCB) {
    const request = $.ajax({
      url: "/authored_api/highlights/" + highlight.id + "/photos",
      method: "POST",
      data: { highlight: highlight,
              photo: image}
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
