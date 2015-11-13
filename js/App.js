import React, { Component } from 'react';
import { sendMessage, } from './chromePromises';
import {
  START,
  STOP,
  DO_REFOCUS,
  PARAMS,
} from './constants';

export default class App extends Component {

  start = () => {
    const params = { ...PARAMS, url: this.urlInput.value };
    sendMessage({ type: START, params, doRefocus: this.doRefocusInput.checked });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>
        <label style={{  flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <span style={{ flexGrow: 1 }}>URL:</span>
          <input 
            ref={ ref => this.urlInput = ref }
            style={{ flexGrow: 2 }}
            defaultValue={this.props.defaultUrl} />
        </label>
        <label style={{ flexGrow: 2, display: 'flex', alignItems: 'center' }}>
          Refocus Opener: 
          <input
            type='checkbox'
            ref={ ref => this.doRefocusInput = ref }
            onChange={ e => sendMessage({ type: DO_REFOCUS, doRefocus: e.target.checked }) } 
            defaultChecked={ this.props.doRefocusChecked }
            style={styles.clickable} />
        </label>
        <div style={{ flexGrow: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={this.start} style={styles.clickable}>Start</button>
          <button onClick={ () => sendMessage({ type: STOP }) } style={styles.clickable}>
            Stop
          </button>
        </div>
        <div style={{ flexGrow: 2, display: 'flex', alignItems: 'center' }}>
          <button onClick={ () => sendMessage({ CLEAR_PARAMS }) } style={styles.clickable}>
            Clear Params
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  clickable: {
    cursor: 'pointer',
  }
};