import ReactDOM from 'react-dom';
import App from './App';

import { start, stop, clearParams, doRefocus, init, } from './actions';
import { PARAMS, } from './constants';
import { getCurrentTab, sendMessage, } from './chromePromises';

window.onload = async function initApp() {
  const tab = await getCurrentTab();
  const state = await sendMessage(init());
  console.log(state);
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