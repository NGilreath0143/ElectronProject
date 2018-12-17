import React, { Component } from 'react';
import Constants from './Constants'
import YouTube from './YouTube'

export default class VideoPlayer extends Component {
  loadVideo(source, videoId, width, height) {
    switch(source) {
      case Constants.VideoSources.YouTube:
        return <YouTube videoId={videoId} width={width} height={height}/>;

      case Constants.VideoSources.Vimeo:
        break;

      default:
        console.log("Video source not found.")
        break;
    }
    
  }

  render() {
    return (
      <div id="player">
        {this.loadVideo(this.props.source, this.props.videoId, this.props.width, this.props.height)}
      </div>
    );
  }
}
