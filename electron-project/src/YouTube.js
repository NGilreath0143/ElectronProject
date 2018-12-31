import React, { Component } from 'react'
import Constants from './Constants'

const PlayerStates = Constants.YouTube.PlayerStates;

let that;
let youtubeAPI;

export default class YouTube extends Component {
  hideVideo() {
    document.getElementById('youtubeComponent').style.visibility = "hidden";
  }
  
  isVideoHidden() {
    return document.getElementById('youtubeComponent').style.visibility === "hidden";
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  disableVideo() {
    this.pauseVideo();
    this.hideVideo();
  }

  isPlaying() {
    return typeof this.player.getPlayerState === "function" && this.player.getPlayerState() === PlayerStates.Playing;
  }


  componentDidMount () {
    that = this;

    if (!youtubeAPI) {
      youtubeAPI = new Promise((resolve) => {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        window.onYouTubeIframeAPIReady = () => resolve(window.YT)
      })
    }
    youtubeAPI.then((YT) => {
      this.player = new YT.Player(this.youtubePlayerAnchor, {
        width: this.props.width,
        height: this.props.height,
        videoId: this.props.videoId,
        playerVars: {rel: 0}
      });
    });
  }

  render () {
    return (
      <section id='youtubeComponent-wrapper'>
        <div ref={(r) => { this.youtubePlayerAnchor = r }} id='youtubeComponent'></div>
      </section>
    );
  }
}