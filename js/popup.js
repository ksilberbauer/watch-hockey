import {
  start,
  stop,
} from './actions';

import {
  PARAMS,
} from './constants';

import {
  getCurrentTab,
  sendMessage,
} from './chromePromises';

async function setUrl() {
  const tab = await getCurrentTab();
  document.getElementById('url').value = tab.url;
};

window.onload = setUrl();

document.getElementById('start').onclick = async function() {  
  const params = { ...PARAMS, url: document.getElementById('url').value };
  await sendMessage(start(params));
};
  
document.getElementById('stop').onclick = async function() {
  await sendMessage(stop());
};