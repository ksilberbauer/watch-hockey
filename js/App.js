import React, { Component } from 'react';
import { sendMessage, } from './chromePromises';

export default class App extends Component {

  state = {
    doRefocusChecked: this.props.doRefocusClicked,
  }

  start = () => {
    const params = { ...this.props.defaultParams, url: this.urlInput.value };
    sendMessage(this.props.startAction(params), this.state.doRefocusChecked);
  }

  doRefocus = isChecked => {
    sendMessage(this.props.doRefocus(isChecked));
    this.setState({ ...this.state, doRefocusChecked: isChecked });
  }

  render() {
    return (
      <div>
        <label>
          URL: 
          <input ref={ ref => this.urlInput = ref } defaultValue={this.props.defaultUrl} />
        </label>
        <button onClick={this.start}>Start</button>
        <button onClick={ () => sendMessage(this.props.stopAction()) }>
          Stop
        </button>
        <button onClick={ () => sendMessage(this.props.clearParams()) }>
          Clear Params
        </button>
        <label>
          Refocus Opener: 
          <input
            type='checkbox'
            onChange={ e => this.doRefocus(e.target.checked) } 
            checked={ this.state.doRefocusChecked } />
        </label>
      </div>
    );
  }
}