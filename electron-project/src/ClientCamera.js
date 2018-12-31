import React, { Component } from 'react';
import Config from './Config'

let net;

var isElectron = false;

try{
  net = window.require('electron').remote.net;
  isElectron = true;
}
catch(err)
{
  // These  variables don't work in the browser, but they are required in electron; especially production.
}

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

  takeSnapshot() {
    var video = document.getElementById('camera-stream');
    var width = video.videoWidth;
    var height = video.videoHeight;

    var hidden_canvas = document.getElementById('canvas');
    hidden_canvas.width = width;
    hidden_canvas.height = height;

    var context = hidden_canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);

    var imageDataURL = hidden_canvas.toDataURL('image/png');
    this.sendPhoto(imageDataURL);
  }
  
  async sendPhoto(imageDataURL) {
    var body = JSON.stringify({
      subject: 'Electron App Photos',
      message: "We got a picture of this person using the app!",
      image: imageDataURL
    });

    if(isElectron) {
      const request = net.request({
        method: 'POST',
        url: 'http://localhost:2900/api/contact/photo'
      });
      request.setHeader("Content-Type", 'application/json');
      request.write(body);
      request.end();
    }
    else {
      await fetch('/api/contact/photo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: body
      });
    }
  }

  render() {
    return (
      <div className="camera">
        <video id="camera-stream" style={{display: "none"}} autoPlay></video>
        <canvas style={{display: "none"}} id="canvas"></canvas>
      </div>
    );
  }
}