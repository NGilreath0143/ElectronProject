import React, { Component } from 'react'
import Constants from './Constants'

let that;
let youtubeAPI;

const PlayerStates = {
  Unstarted: -1,
  Ended: 0,
  Playing: 1,
  Paused: 2,
  Buffering: 3,
  VideoCued: 5
}

export default class YouTube extends Component {
  checkPageFocus() {
    if (!document.hasFocus()) {
      that.pauseVideo();
    }
  }

  pauseVideo() {
    if (typeof this.player.pauseVideo === "function" 
    && typeof this.player.getPlayerState === "function" 
    && this.player.getPlayerState() === PlayerStates.Playing) {
      this.player.pauseVideo();
    }
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
        width: this.props.width || Constants.DefaultVideoPlayerSize.Width,
        height: this.props.height || Constants.DefaultVideoPlayerSize.Height,
        videoId: this.props.videoId,
        playerVars: {rel: 0},
        events: {
          onStateChange: this.onPlayerStateChange
        }
      });
    });

    setInterval(this.checkPageFocus, 300);
  }

  onPlayerStateChange(event) {
    // In case we want to perform actions/checks upon state changes (play, pause, etc...)
  }

  render () {
    return (
      <section className='youtubeComponent-wrapper'>
        <div ref={(r) => { this.youtubePlayerAnchor = r }}></div>
      </section>
    );
  }
}