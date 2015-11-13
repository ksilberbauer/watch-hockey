import ReactDOM from 'react-dom';
import App from './App';

import { getCurrentTab, sendMessage, } from './chromePromises';
import {
  INIT,
} from './constants';

window.onload = async function init() {
  const tab = await getCurrentTab();
  const initialState = await sendMessage({ type: INIT });

  ReactDOM.render(
    <App 
      defaultUrl={tab.url} 
      doRefocus={initialState.doRefocus} />,
    document.getElementById('app')
  );
};