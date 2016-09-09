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
    } else if (highlight.anchorOffset > highlight.focusOffset) {
      endIndex = highlight.anchorOffset;
      startIndex = highlight.focusOffset;
    } else {
      return
    }
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
    if (this.state.highlightable === true) {
      document.getElementById('postText').removeEventListener("mouseup", this._getHighlightIndices)
      this.setState({highlightable: false});
    } else {
      document.getElementById('postText').addEventListener("mouseup", this._getHighlightIndices)
      this.setState({highlightable: true});
    }
  },
  _handleHighlight(startIdx, endIdx) {
    var overlappingHighlight = this._overlappingHighlight(startIdx,endIdx)
    if (overlappingHighlight) {
      this._addPhotoToHighlight(overlappingHighlight);
    } else {
      this._createHighlight(startIdx, endIdx);
    }
  },
  _overlappingHighlight(startIdx, endIdx) {
    var overlappedHighlight;
    this.state.post.highlights.forEach(function(highlight) {
      if (highlight.start_idx >= startIdx && highlight.start_idx <= endIdx) {
        overlappedHighlight = highlight;
      } else if (highlight.end_idx >= startIdx && highlight.end_idx <= endIdx) {
        overlappedHighlight = highlight;
      } else if (highlight.start_idx <= startIdx && highlight.end_idx >= endIdx) {
        overlappedHighlight = highlight;
      }
    })
    if (overlappedHighlight) {
      return overlappedHighlight;
    } else {
      return false;
    }
  },
  _createHighlight(startIdx, endIdx) {
    var highlight = {}
    highlight.post_id = this.state.post.id;
    highlight.start_idx = startIdx;
    highlight.end_idx = endIdx
    PostActions.addHighlightToPost(highlight);
  },
  _addPhotoToHighlight(highlight) {

  },
  _createPostBody() {

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
