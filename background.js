import {
  START,
  STOP,
  TTL,
} from './constants';

import {
  createWindow,
  getWindow,
  removeWindow,
} from './chromePromises.js';

let timeoutId;

async function createNextWindow(prevWinId, prevParams) {
  const prevWin = await getWindow(prevWinId)
  const nextParams = { 
    ...prevParams, 
    top: prevWin.top, 
    left: prevWin.left, 
    height: prevWin.height, 
    width: prevWin.width 
  };
  await removeWindow(prevWin.id);
  await loop(nextParams); 
};

async function loop(params) {
  clearTimeout(timeoutId); // if any still active
  const win = await createWindow(params);
  timeoutId = setTimeout(() => createNextWindow(win.id, params), TTL);
};

const router = (req, sender, respond) => {
  switch(req.type) {
    case START:
      clearTimeout(timeoutId);
      loop(req.params);
      break;s
    case STOP:
      clearTimeout(timeoutId);
      break;
    default:
      console.log('Error: Invalid request type', req.type);
  }
};

chrome.runtime.onMessage.addListener(router);