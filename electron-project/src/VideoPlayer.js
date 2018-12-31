import React, { Component } from 'react';
import Constants from './Constants'
import Config from './Config'
import VideoMonitor from './VideoMonitor'
import YouTube from './YouTube'

const Statuses = Constants.VideoMonitor.Statuses;

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.video = React.createRef();
    this.videoMonitor = React.createRef();
  }

  handler() {
    var status = this.videoMonitor.current.getCurrentStatus();

    switch(status) {
      case Statuses.Initial:
        break;

      case Statuses.PageUnfocused:
        if(this.video.current.isPlaying()) {
          this.video.current.disableVideo();
        } 
        else if (this.video.current.isVideoHidden()) {
          this.promptUserAttentionCheck();
        }
        break;

      case Statuses.ScreenshotAttempted:
        this.video.current.disableVideo();
        break;

      default:
        window.alert("Invalid Video Monitor Status:", status);
    }
  }

  promptUserAttentionCheck(){
    if (window.confirm("Are you still watching? If so, please don't leave the app. ('Cancel' will reload the page)")) {
      var youtubeComponent = document.getElementById('youtubeComponent');
      youtubeComponent.style.visibility = "initial";
      this.video.current.playVideo();
    } else {
      window.location.reload();
    }
  }

  loadVideo(source, videoId, width, height) {
    
    switch(source) {
      case Constants.VideoSources.YouTube:
        return <YouTube ref={this.video} videoId={videoId} width={width} height={height}/>;

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
        <VideoMonitor ref={this.videoMonitor} updateVideoPlayer={this.handler}/>
      </div>
    );
  }
}
