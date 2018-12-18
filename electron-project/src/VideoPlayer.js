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
    this.width = this.props.width || Constants.DefaultVideoPlayerSize.Width;
    this.height = this.props.height || Constants.DefaultVideoPlayerSize.Height;
    
    return (
      <div id="player" style={{background:"black",height:this.height, width:this.width}}>
        {this.loadVideo(this.props.source, this.props.videoId, this.props.width, this.props.height)}
      </div>
    );
  }
}
