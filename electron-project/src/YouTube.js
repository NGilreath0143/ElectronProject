import React, { Component } from 'react'

let youtubeAPI;

export default class YouTube extends Component {
  componentDidMount () {
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
        width: this.props.width || 560,
        height: this.props.height || 315,
        videoId: this.props.videoId,
        events: {
          onStateChange: this.onPlayerStateChange
        }
      });
    });
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