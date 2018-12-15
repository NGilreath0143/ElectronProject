import React, { Component } from 'react';

class Video extends Component {
  render() {
    return (
      <iframe
        width="784"
        height="441"
        src={this.props.src}
        frameBorder="0"
      >
      </iframe>
    );
  }
}

export default Video;
