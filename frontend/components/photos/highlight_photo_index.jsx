import React from 'react';
import { render } from 'react-dom';
import ImageGallery from 'react-image-gallery';

const HighlightPhotoIndex = React.createClass({

  _allPhotos() {
    var photos = [];
    if (this.props.highlight && this.props.highlight.photos) {
      this.props.highlight.photos.forEach(function(photo) {
        photos.push({original: photo.url,
                     thumbnail: photo.thumbnail_url});
        })
    }
    return photos;
  },
  render() {
    const photos = this._allPhotos();
    return (
      <ImageGallery
        ref={i => this._imageGallery = i}
        items={photos}
        slideInterval={2000}/>
    );
  }

})

module.exports = HighlightPhotoIndex;
