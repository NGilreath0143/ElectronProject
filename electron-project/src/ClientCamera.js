import React, { Component } from 'react';
import Config from './Config'

export default class ClientCamera extends Component {
  turnCameraOn() {
    navigator.mediaDevices.getUserMedia(Config.ClientCameraSettings.VideoConstraints).then((stream) => {
      const video = document.getElementById('camera-stream');
      video.srcObject = stream
      video.play();
    }).catch((error) => {
      console.error(error)
    })
  }

  componentDidMount() {
    this.turnCameraOn();
  }

  takeSnapshot(){
    var video = document.getElementById('camera-stream');
    var width = video.videoWidth;
    var height = video.videoHeight;

    var hidden_canvas = document.getElementById('canvas');
    hidden_canvas.width = width;
    hidden_canvas.height = height;

    var context = hidden_canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);

    var imageDataURL = hidden_canvas.toDataURL('image/png');

    // Doesn't do anything with the picture as of now
}

  render() {
    return (
      <div className="camera">
        <video id="camera-stream" style={{display: "none"}} autoPlay></video>
        <canvas style={{display: "none"}} id="canvas"></canvas>
        <button onClick={this.takeSnapshot.bind(this)}>Take a picture</button>
      </div>
    );
  }
}