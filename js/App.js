import React, { Component } from 'react';
import { sendMessage, } from './chromePromises';

export default class App extends Component {

  start = () => {
    const params = { ...this.props.defaultParams, url: this.urlInput.value };
    sendMessage(this.props.startAction(params));
  }
  
  stop = () => sendMessage(this.props.stopAction())

  clearParams = () => sendMessage(this.props.clearParams())

  render() {
    return (
      <div>
        <label>URL: 
          <input ref={ ref => this.urlInput = ref } defaultValue={this.props.defaultUrl} />
        </label>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
        <button onClick={this.clearParams}>Clear Params</button>
      </div>
    );
  }
}