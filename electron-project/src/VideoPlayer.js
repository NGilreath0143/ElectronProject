import React, { Component } from 'react';
import ClientCamera from './ClientCamera'
import Constants from './Constants'
import Config from './Config'
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
    this.width = this.props.width || Config.DefaultVideoPlayerSize.Width;
    this.height = this.props.height || Config.DefaultVideoPlayerSize.Height;
    
    return (
      <div id="player" style={{background:"black",height:this.height, width:this.width}}>
        {this.loadVideo(this.props.source, this.props.videoId, this.props.width, this.props.height)}
        <ClientCamera />
      </div>
    );
  }
}
