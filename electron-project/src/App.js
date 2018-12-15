import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Video from './Video'

class App extends Component {
  renderVideo(src) {
    return <Video src={src}/>;
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.renderVideo("https://www.youtube.com/embed/YE7VzlLtp-4")}
        </header>
      </div>
    );
  }
}

export default App;
