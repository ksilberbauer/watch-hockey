import React, { Component } from 'react';
import { sendMessage, } from './chromePromises';

export default class App extends Component {

  state = {
    doRefocusChecked: this.props.doRefocusClicked,
  }

  start = () => {
    const params = { ...this.props.defaultParams, url: this.urlInput.value };
    sendMessage(this.props.startAction(params, this.state.doRefocusChecked), this.state.doRefocusChecked);
  }

  doRefocus = isChecked => {
    sendMessage(this.props.doRefocus(isChecked));
    this.setState({ ...this.state, doRefocusChecked: isChecked });
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
            onChange={ e => this.doRefocus(e.target.checked) } 
            checked={ this.state.doRefocusChecked }
            style={styles.clickable} />
        </label>
        <div style={{ flexGrow: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={this.start} style={styles.clickable}>Start</button>
          <button onClick={ () => sendMessage(this.props.stopAction()) } style={styles.clickable}>
            Stop
          </button>
        </div>
        <div style={{ flexGrow: 2, display: 'flex', alignItems: 'center' }}>
          <button onClick={ () => sendMessage(this.props.clearParams()) } style={styles.clickable}>
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