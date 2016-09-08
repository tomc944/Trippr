import React from 'react';
import { render } from 'react-dom';

const PostIndexItem = React.createClass({
  render() {
    return (
      <div>
        <h1>{this.props.post.title}</h1>
        <p>{this.props.post.post}</p>
      </div>
    )
  }
})

export default PostIndexItem;
