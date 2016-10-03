import React from 'react';
import { render } from 'react-dom';
import { Form, FormGroup, ControlLabel,
         FormControl, Button, Col } from 'react-bootstrap';
import PostActions from '../../actions/post_actions';

const PostForm = React.createClass({
  blankAttrs: {
    post: "",
    title: "",
    url: "",
    thumbnail_url: ""
  },
  getInitialState() {
    return this.blankAttrs;
  },
  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },
  redirectToShow(id) {
    // TODO: Definitely refactor this
    this.props.history.push('/posts/' + id);
  },
  handleCreation(event) {
    event.preventDefault();
    PostActions.addPost(this.state, this.redirectToShow)
  },
  _addCoverPhoto() {
    var options = CLOUDINARY_OPTIONS
    options.max_image_height = 400;
    cloudinary.openUploadWidget(options, function(error, images) {
      if (!error) {
        var image = images[0];
        this.setState({url: image.url,
                       thumbnail_url: image.thumbnail_url})
      }
    }.bind(this));
  },
  _coverOptions() {
    if (this.state.url === '') {
      return (
        <Button type='button' onClick={this._addCoverPhoto}>
          Upload Cover Photo!
        </Button>
      )
    } else {
      return (
        <img src={this.state.thumbnail_url}/>
      )
    }
  },
  render () {
    return (
      <Form horizontal>
        <FormGroup controlId="formTitle">
          <Col componentClass={ControlLabel} sm={2}>
            Title
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              value={this.state.title}
              onChange={this.update("title")}
              placeholder="Trip to Mt. Shasta" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formPost">
          <Col componentClass={ControlLabel} sm={2}>
            Post Body
          </Col>
          <Col sm={8}>
            <FormControl
              componentClass="textarea"
              value={this.state.post}
              onChange={this.update("post")}
              placeholder="Was a dope trip out to Mt. Shasta"
               />
          </Col>
        </FormGroup>

        <div className='coverOptions'>{this._coverOptions()}</div>
        <Button type='button' onClick={this.handleCreation}>
          Create a Post!
        </Button>
      </Form>
    )
  }
})

export default PostForm
