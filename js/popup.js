import ReactDOM from 'react-dom';
import App from './App';

import { start, stop, clearParams, doRefocus, getState, } from './actions';
import { PARAMS, } from './constants';
import { getCurrentTab, sendMessage, } from './chromePromises';

window.onload = async function init() {
  const tab = await getCurrentTab();
  const state = await sendMessage(getState());
  ReactDOM.render(
    <App 
      defaultUrl={tab.url} 
      defaultParams={PARAMS}
      doRefocusClicked={state.doRefocus} 
      startAction={start} 
      stopAction={stop} 
      clearParams={clearParams}
      doRefocus={doRefocus} />,
    document.getElementById('app')
  );
};