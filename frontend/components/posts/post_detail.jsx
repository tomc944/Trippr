import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import PostStore from '../../stores/post_store';
import PostActions from '../../actions/post_actions';
import ModalStyle from '../../modal_style';
import HighlightPhotoIndex from '../photos/highlight_photo_index';
import SessionStore from '../../stores/session_store';
import { Link } from 'react-router';

const PostDetail = React.createClass({
  getInitialState() {
    return {
      post: PostStore.find(this.grabId()),
      highlightable: false,
      modalOpen: false,
      modalHighlight: null
    }
  },
  grabId(props) {
    const id = props ? props.params.id : this.props.params.id;
    return parseInt(id);
  },
  componentDidMount() {
    this.postToken = PostStore.addListener(this._onChange);
    PostActions.fetchPost(this.grabId());
  },
  componentWillReceiveProps(newProps) {
    PostActions.fetchPost(this.grabId(newProps));
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
    if (!this._isOverlappingHighlight(startIdx, endIdx)) {
      this._createHighlight(startIdx, endIdx);
    }
  },
  _isOverlappingHighlight(startIdx, endIdx) {
    var overLapping = false;

    this.state.post.highlights.forEach(function(highlight) {
      if (this._isOverLapping(startIdx, endIdx, highlight.start_idx, highlight.end_idx)) {
        overLapping = true;
      }
    }.bind(this))

    return overLapping;
  },
  _isOverLapping(newStartIdx, newEndIdx, oldStartIdx, oldEndIdx) {
    return this._newHighlightLeftOverlap(newStartIdx, oldStartIdx, oldEndIdx) ||
           this._newHighlightRightOverlap(newEndIdx, oldStartIdx, oldEndIdx) ||
           this._newHighlightFullOverlap(newStartIdx, newEndIdx, oldStartIdx, oldEndIdx);
  },
  _newHighlightLeftOverlap(newStartIdx, oldStartIdx, oldEndIdx) {
    return newStartIdx >= oldStartIdx && newStartIdx <= oldEndIdx;
  },
  _newHighlightRightOverlap(newEndIdx, oldStartIdx, oldEndIdx) {
    return newEndIdx >= oldStartIdx && newEndIdx <= oldEndIdx;
  },
  _newHighlightFullOverlap(newStartIdx, newEndIdx, oldStartIdx, oldEndIdx) {
    return oldStartIdx >= newStartIdx && oldEndIdx <= oldStartIdx;
  },
  _createHighlight(startIdx, endIdx) {
    var highlight = {};
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
        body.push(<span className='plainText'>{text.slice(index,highlight.start_idx)}</span>);
        body.push(<span className='highlightedText'
                        onClick={this._openModal.bind(this, highlight)}>
          {text.slice(highlight.start_idx,highlight.end_idx)}
        </span>);
        index = highlight.end_idx;
      }, this);
      body.push(<span className='plainText'>{text.slice(index)}</span>)
    }
    return body
  },
  _sortHighlights() {
    var highlights;

    if (!!this.state.post.highlights) {
      highlights = this.state.post.highlights;
      highlights.sort(function (a, b) {
        if (a.start_idx > b.start_idx) {
          return 1;
        } else if (a.start_idx < b.start_idx) {
          return -1;
        } else {
          return 0;
        }
      });
    }

    return highlights || [];
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
  loginOrHighlight(option) {
    if (SessionStore.isUserLoggedIn()) {
      return <h4 className='toggleHighlights' onClick={this._toggleHighlightable}>
        {this._highlightable()}
      </h4>
    } else {
      return <h4><Link to="login">Login to Highlight Posts!</Link></h4>
    }
  },
  loginOrPhoto() {
    if (SessionStore.isUserLoggedIn()) {
      return <button id='addPhoto' onClick={this._addPhotoToHighlight}>+</button>
    } else {
      return <h4><Link to="login">Login to Upload Photos!</Link></h4>
    }
  },
  _coverPhoto() {
    if (this.state.post.photos && this.state.post.photos.length > 0) {
      return (<img className='coverPhoto' src={this.state.post.photos[0].url}/>)
    }
  },
  render () {
    return (
      <div className='post-show'>

        <h1 className='report-title'>{this.state.post.title}</h1>
        <h5 className='report-author'>Author: {this.state.post.author_username}</h5>
        <div className='coverPhotoContainer'>{this._coverPhoto()}</div>
        <div className='loginOrHighlight'>{this.loginOrHighlight()}</div>
        <p className='postText' id='postText'>{this._createPostBody()}</p>

        <Modal
          class='imageModal'
          isOpen={this.state.modalOpen}
          onRequestClose={this._onModalClose}
          style={ModalStyle}>

          <button id='closeModal' onClick={this._onModalClose}>close</button>
          {this.loginOrPhoto()}
          <div id='photoIndex'>
            <HighlightPhotoIndex highlight={this.state.modalHighlight}/>
          </div>
        </Modal>

      </div>
    )
  }
});

module.exports = PostDetail;
