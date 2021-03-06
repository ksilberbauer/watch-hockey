// TODO: fix nextParams/clearParams
// TODO: show time remaining in UI
// TODO: make UI prettier
// TODO: make the button stop by default if pressed? then timer UI would need to be on the button
// TODO: turn start button into stop when running

import {
  INIT,
  START,
  STOP,
  DO_REFOCUS,
  GET_STATE,
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
let delayTimeoutId;
let nextParams;
let currentWinId;
let doRefocus = true;

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
  delayTimeoutId = setTimeout(() => loop(nextParams) , 750); // delay to prevent cookie
};

async function loop(params) {
  const tab = await getCurrentTab();
  const win = await createWindow(params);
  if (!win) { throw new Error('Make sure the extension has incognito allowed!'); }
  currentWinId = win.id;
  timeoutId = setTimeout(() => createNextWindow(currentWinId, params), TTL);
  if (doRefocus) { focusWindow(tab.windowId); }
};

const close = () => removeWindow(currentWinId);

const router = (req, sender, respond) => {
  switch(req.type) {
    case INIT:
      respond({ params: nextParams, doRefocus });
      return true;
    case START:
      clearTimeout(timeoutId);
      clearTimeout(delayTimeoutId);
      doRefocus = req.doRefocus;
      loop(req.params);
      return true;
    case STOP:
      clearTimeout(timeoutId);
      clearTimeout(delayTimeoutId);
      close();
      return true;
    case DO_REFOCUS:
      doRefocus = req.doRefocus;
      return true;
    case GET_STATE:
      console.log(req.doRefocus);
      respond({ 
        params: nextParams, 
        doRefocus: typeof req.doRefocus === 'undefined' ? true : req.doRefocus 
      });
      return true;
    case CLEAR_PARAMS:
      nextParams = null;
      return true;
    default:
      console.log('Error: Invalid request type', req.type);
      return true;
  }
};

chrome.runtime.onMessage.addListener(router);