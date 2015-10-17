import {
  start,
  stop,
} from './actions';

import {
  PARAMS,
} from './constants';

import {
  getCurrentTab,
} from './chromePromises';

async function setUrl() {
  const tab = await getCurrentTab()
  document.getElementById('url').value = tab.url;
};

window.onload = setUrl();

document.getElementById('start').onclick = () => {
  const params = { ...PARAMS, url: document.getElementById('url').value };
  chrome.runtime.sendMessage(start(params), res => console.log(res));
};
  
document.getElementById('stop').onclick = () => {
  chrome.runtime.sendMessage(stop(), res => console.log(res));
};