import React from 'react';
import { render } from 'react-dom';
import { Form, FormGroup, ControlLabel,
         FormControl, Button } from 'react-bootstrap';
import PostActions from '../../actions/post_actions';

const PostForm = React.createClass({
  blankAttrs: {
    post: "",
    title: "",
  },
  getInitialState() {
    return this.blankAttrs;
  },
  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },
  handleCreation(event) {
    event.preventDefault();
    PostActions.addPost(this.state)
  },
  render () {
    return (
      <Form horizontal>
        <FormGroup controlId="formTitle">
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            value={this.state.title}
            onChange={this.update("title")}
            placeholder="Trip to Mt. Shasta" />
        </FormGroup>

        <FormGroup controlId="formPost">
          <ControlLabel>Post</ControlLabel>
          <FormControl
            componentClass="textarea"
            value={this.state.post}
            onChange={this.update("post")}
            placeholder="Was a dope trip out to Mt. Shasta"
             />
        </FormGroup>
        <Button type='button' onClick={this.handleCreation}>
          Create a Post!
        </Button>
      </Form>
    )
  }
})

export default PostForm
