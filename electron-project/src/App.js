import React, { Component } from 'react';
import './App.css';
import Constants from './Constants'
import VideoPlayer from './VideoPlayer'

export default class App extends Component {
  renderVideoPlayer(source, videoId, width, height) {
    return <VideoPlayer source={source} videoId={videoId} width={width} height={height}/>;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.videoPlayer = this.renderVideoPlayer(Constants.VideoSources.YouTube, "YE7VzlLtp-4", 784, 441)}
        </header>
      </div>
    );
  }
}