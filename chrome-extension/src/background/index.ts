import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

// Initialize theme
exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

// Handle extension icon click
chrome.action.onClicked.addListener(() => {
  // Create a new tab with our React-based page
  chrome.tabs.create({
    url: chrome.runtime.getURL('new-tab/index.html'),
    active: true,
  });
});

console.log('background loaded');
