import React from 'react';
import { render } from 'react-dom';
import PostStore from '../../stores/post_store';
import PostActions from '../../actions/post_actions';

const PostDetail = React.createClass({
  getInitialState() {
    return {
      post: PostStore.find(this.grabId()),
      highlightable: false
    }
  },
  grabId() {
    return parseInt(this.props.params.id)
  },
  componentDidMount() {
    this.postToken = PostStore.addListener(this._onChange);
    PostActions.fetchPost(this.grabId());
  },
  _onChange() {
    this.setState({ post: PostStore.find(this.grabId()) })
  },
  componentWillUnmount() {
    this.postToken.remove();
  },
  _getHighlightIndices() {
    var highlight = window.getSelection();
    var startIndex;
    var endIndex;
    if (highlight.anchorOffset < highlight.focusOffset) {
      startIndex = highlight.anchorOffset;
      endIndex = highlight.focusOffset;
    }
    debugger

    this._handleHighlight(startIndex,endIndex);
  },
  _highlightable() {
    if (this.state.highlightable === true) {
      return <div>Highlight text now!</div>
    } else {
      return <div>Click here to add highlights!</div>
    }
  },
  _toggleHighlightable() {
    console.log("toggled!")
    if (this.state.highlightable === true) {
      document.getElementById('postText').removeEventListener("mouseup", this._getHighlightIndices)
      this.setState({highlightable: false});
    } else {
      document.getElementById('postText').addEventListener("mouseup", this._getHighlightIndices)
      this.setState({highlightable: true});
    }
  },
  _handleHighlight(startIdx, endIdx) {

  },

  render () {
    return (
      <div>
        <h1>{this.state.post.title}</h1>
        <h4 onClick = {this._toggleHighlightable}>{this._highlightable()}</h4>
        <p id='postText'>{this.state.post.post}</p>

      </div>
    )
  }
});

module.exports = PostDetail;
