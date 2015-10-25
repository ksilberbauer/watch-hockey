import ReactDOM from 'react-dom';
import App from './App';

import { start, stop, } from './actions';
import { PARAMS, } from './constants';
import { getCurrentTab, } from './chromePromises';

window.onload = async function init() {
  const tab = await getCurrentTab();
  ReactDOM.render(
    <App defaultUrl={tab.url} defaultParams={PARAMS} startAction={start} stopAction={stop} />,
    document.getElementById('app')
  );
};