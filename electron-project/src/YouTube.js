import React, { Component } from 'react'

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
      if(that.isPlaying()) {
        that.hideVideo();
        that.pauseVideo();
      } 
      else if (that.isVideoHidden()) {
        that.promptUser();
      }
    } 

  }

  hideVideo() {
    var youtubeComponent = document.getElementById('youtubeComponent');
    youtubeComponent.style.visibility = "hidden";
  }
  isVideoHidden() {
    var youtubeComponent = document.getElementById('youtubeComponent');

    return youtubeComponent.style.visibility === "hidden";
  }

  playVideo() {
    if (typeof this.player.playVideo === "function") {
      this.player.playVideo();
    }
  }

  pauseVideo() {
    if (typeof this.player.pauseVideo === "function") {
      this.player.pauseVideo();
    }
  }

  isPlaying() {
    return typeof this.player.getPlayerState === "function" && this.player.getPlayerState() === PlayerStates.Playing;
  }

  promptUser(){
    if (window.confirm("Are you still watching? If so, please don't leave the app. ('Cancel' will reload the page)")) {
      var youtubeComponent = document.getElementById('youtubeComponent');
      youtubeComponent.style.visibility = "initial";
      that.playVideo();
    } else {
      window.location.reload();
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
        width: this.props.width,
        height: this.props.height,
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
      <section id='youtubeComponent-wrapper'>
        <div ref={(r) => { this.youtubePlayerAnchor = r }} id='youtubeComponent'></div>
      </section>
    );
  }
}