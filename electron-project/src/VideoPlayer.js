import React, { Component } from 'react';
import ClientCamera from './ClientCamera'
import Constants from './Constants'
import Config from './Config'
import YouTube from './YouTube'

let that;

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
    this.clientCamera = React.createRef();
  }

  componentDidMount () {
    that = this;
    
    this.clientCamera.current.turnCameraOn();
    setInterval(this.checkPageFocus, 300);
  }

  checkPageFocus() {
    if (!document.hasFocus()) {
      if(that.video.current.isPlaying()) {
        that.video.current.disableVideo();
      } 
      else if (that.video.current.isVideoHidden()) {
        that.promptUserAttentionCheck();
      }
    } 
  }

  promptUserAttentionCheck(){
    if (window.confirm("Are you still watching? If so, please don't leave the app. ('Cancel' will reload the page)")) {
      var youtubeComponent = document.getElementById('youtubeComponent');
      youtubeComponent.style.visibility = "initial";
      that.video.current.playVideo();
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
        <ClientCamera ref={this.clientCamera} />
      </div>
    );
  }
}
