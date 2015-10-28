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
  timeoutId = setTimeout(() => createNextWindow(win.id, params), TTL);
  await focusWindow(tab.windowId);
};

const router = (req, sender, respond) => {
  switch(req.type) {
    case START:
      clearTimeout(timeoutId);
      loop(nextParams || req.params);
      break;
    case STOP:
      clearTimeout(timeoutId);
      break;
    case CLEAR_PARAMS:
      nextParams = null;
    default:
      console.log('Error: Invalid request type', req.type);
  }
};

chrome.runtime.onMessage.addListener(router);