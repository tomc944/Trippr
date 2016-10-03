import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router'

const PostIndexItem = React.createClass({
  render() {
    const postLink = "/posts/" + this.props.post.id;

    return (
      <div className="ellipsis">
        <h3 className='report-title'><Link to={postLink}>{this.props.post.title}</Link></h3>
        <p className='report-body'>{this.props.post.post}</p>
      </div>
    )
  }
})

export default PostIndexItem;
