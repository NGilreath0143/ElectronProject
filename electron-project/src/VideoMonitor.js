import React, { Component } from 'react';
import ClientCamera from './ClientCamera'
import Constants from './Constants'

const Statuses = Constants.VideoMonitor.Statuses;
const KeyCodes = Constants.Keyboard.KeyCodes;

let that;
let globalShortcut;

try{
  globalShortcut = window.require('electron').remote.globalShortcut;
}
catch(err)
{
  // This variable doesn't work in the browser
}

export default class VideoMonitor extends Component {
  constructor(props) {
    super(props);
    this.clientCamera = React.createRef();
    this.state = {
      status: Statuses.Initial
    }
  }

  getCurrentStatus() {
    return this.state.status;
  }

  updateStatus(status) {
    this.setState({
      status: status
    });
    this.props.updateVideoPlayer();
  }

  checkPageFocus() {
    if (that.state.status === Statuses.ScreenshotAttempted)
      return;

    if (!document.hasFocus()) {
      that.updateStatus(Statuses.PageUnfocused);
    }
    else if (that.state.status === Statuses.PageUnfocused) {
      that.updateStatus(Statuses.Initial);
    }
  }

  screenshotProtocol() {
    this.updateStatus(Statuses.ScreenshotAttempted);
    this.clientCamera.current.takeSnapshot();
  }

  registerGlobalShortcut() {
    if (globalShortcut) {
      globalShortcut.unregisterAll();
      const ret = globalShortcut.register('Super+PrintScreen', () => {
        this.screenshotProtocol();
      });
    }
  }

  onKeyUp(e) {
    var eventObj = window.event ? window.event : e;
    if (eventObj.metaKey && eventObj.keyCode == KeyCodes.PrintScreen) {
      that.screenshotProtocol();
    }
  }

  componentDidMount() {
    that = this;
    
    this.clientCamera.current.turnCameraOn();
    this.registerGlobalShortcut();

    document.onkeyup = this.onKeyUp;
    setInterval(this.checkPageFocus, 300);
  }

  render() {
    return (
      <div>
        <ClientCamera ref={this.clientCamera} />
      </div>
    );
  }
}