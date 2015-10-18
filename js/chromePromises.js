export const createWindow = params => new Promise((resolve, reject) => 
  chrome.windows.create(params, win => resolve(win)));
export const getWindow = id => new Promise((resolve, reject) => 
  chrome.windows.get(id, null, win => resolve(win)));
export const removeWindow = id => new Promise((resolve, reject) => 
  chrome.windows.remove(id, id => resolve(id)));
export const getCurrentTab = () => new Promise((resolve, reject) => 
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => resolve(tabs[0])));
export const sendMessage =  message => new Promise((resolve, reject) =>
  chrome.runtime.sendMessage(message, res => resolve(res)));
export const focusWindow = id => new Promise((resolve, reject) =>
  chrome.windows.update(id, { focused: true }, win => resolve(win)));