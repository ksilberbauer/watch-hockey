// TODO: fix nextParams/clearParams
// TODO: show time remaining in UI
// TODO: make UI prettier
// TODO: make the button stop by default if pressed? then timer UI would need to be on the button
// TODO: checkbox about whether focus should be returned to window.opener

import {
  START,
  STOP,
  CLEAR_PARAMS,
  TTL,
} from './constants';

import {
  createWindow,
  getWindow,
  removeWindow,
  focusWindow,
  getCurrentTab,
} from './chromePromises.js';

let timeoutId;
let nextParams;
let currentWinId;

async function createNextWindow(prevWinId, prevParams) {
  const prevWin = await getWindow(prevWinId)
  nextParams = { 
    ...prevParams, 
    top: prevWin.top, 
    left: prevWin.left, 
    height: prevWin.height, 
    width: prevWin.width 
  };
  await removeWindow(prevWin.id);
  setTimeout(() => loop(nextParams) , 750); // delay to prevent cookie
};

async function loop(params) {
  const tab = await getCurrentTab();
  const win = await createWindow(params);
  currentWinId = win.id;
  timeoutId = setTimeout(() => createNextWindow(currentWinId, params), TTL);
  await focusWindow(tab.windowId);
};

const close = () => removeWindow(currentWinId);

const router = (req, sender, respond) => {
  switch(req.type) {
    case START:
      clearTimeout(timeoutId);
      loop(nextParams || req.params);
      break;
    case STOP:
      clearTimeout(timeoutId);
      close();
      break;
    case CLEAR_PARAMS:
      nextParams = null;
    default:
      console.log('Error: Invalid request type', req.type);
  }
};

chrome.runtime.onMessage.addListener(router);