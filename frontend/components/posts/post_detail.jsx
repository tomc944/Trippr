import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import PostStore from '../../stores/post_store';
import PostActions from '../../actions/post_actions';
import ModalStyle from '../../modal_style';
import HighlightPhotoIndex from '../photos/highlight_photo_index';

const PostDetail = React.createClass({
  getInitialState() {
    return {
      post: PostStore.find(this.grabId()),
      highlightable: false,
      modalOpen: false,
      modalHighlight: null
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
    var overallAnchorOffset = this._getHighlightOffset(highlight.anchorNode.parentElement) + highlight.anchorOffset;
    var overallFocusOffset = this._getHighlightOffset(highlight.focusNode.parentElement) + highlight.focusOffset;
    var startIndex;
    var endIndex;
    if (overallAnchorOffset < overallFocusOffset) {
      startIndex = overallAnchorOffset;
      endIndex = overallFocusOffset;
    } else if (overallAnchorOffset > overallFocusOffset) {
      endIndex = overallAnchorOffset;
      startIndex = overallFocusOffset;
    } else {
      return
    }
    this._handleHighlight(startIndex, endIndex);
  },
  _getHighlightOffset(node) {
    node = node.previousSibling
    var offset = 0;
    while (node !== null) {
      offset += node.innerHTML.length;
      node = node.previousSibling;
    }
    return offset;
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
      if (startIdx >= highlight.start_idx && startIdx <= highlight.end_idx) {
        overlappedHighlight = highlight;
      } else if (endIdx >= highlight.start_idx && endIdx <= highlight.end_idx) {
        overlappedHighlight = highlight;
      } else if (highlight.start_idx >= startIdx && highlight.end_idx <= endIdx) {
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
    highlight.end_idx = endIdx;
    var options = CLOUDINARY_OPTIONS
    options.max_image_height = 400;
    cloudinary.openUploadWidget(options, function(error, images) {
      if (!error) {
        var firstImage = images[0];
        PostActions.addHighlightToPost(highlight, firstImage);
      }
    })
  },
  _createPostBody() {
    var body = [];
    var index = 0;
    if (!!this.state.post.post) {
      var text = this.state.post.post
      var highlights = this._sortHighlights()
      highlights.forEach(function(highlight) {
        body.push(<span>{text.slice(index,highlight.start_idx)}</span>);
        // TODO: Place span with className so we don't put style in code

        body.push(<span style={{background: 'rgba(0,255,255,0.3)'}}
                        onClick={this._openModal.bind(this, highlight)}>
          {text.slice(highlight.start_idx,highlight.end_idx)}
        </span>);
        index = highlight.end_idx;
      }, this);
      body.push(<span>{text.slice(index)}</span>)
    }
    return body
  },
  _sortHighlights() {
    var highlights = this.state.post.highlights
    highlights.sort(function (a, b) {
      if (a.start_idx > b.start_idx) {
        return 1;
      } else if (a.start_idx < b.start_idx) {
        return -1;
      } else {
        return 0;
      }
    });
    return highlights;
  },

  _openModal(highlight) {
    this.setState({ modalOpen: true,
                    modalHighlight: highlight});
  },
  _onModalClose() {
    this.setState({ modalOpen: false,
                    modalHighlight: null});
  },
  _addPhotoToHighlight() {
    var highlight = this.state.modalHighlight;
    var options = CLOUDINARY_OPTIONS
    options.max_image_height = 400;
    cloudinary.openUploadWidget(options, function(error, images) {
      if (!error) {
        var image = images[0];
        PostActions.addPhotoToHighlight(highlight, image);
      }
    })
  },

  render () {
    return (
      <div>
        <h1>{this.state.post.title}</h1>
        <h4 onClick = {this._toggleHighlightable}>{this._highlightable()}</h4>
        <p id='postText'>{this._createPostBody()}</p>

      <Modal
        class='imageModal'
        isOpen={this.state.modalOpen}
        onRequestClose={this._onModalClose}
        style={ModalStyle}>
        <button id='closeModal' onClick={this._onModalClose}>close</button>
        <button id='addPhoto' onClick={this._addPhotoToHighlight}>+</button>
        <div id='photoIndex'>
          <HighlightPhotoIndex highlight={this.state.modalHighlight}/>
        </div>
    </Modal>

      </div>
    )
  }
});

module.exports = PostDetail;
