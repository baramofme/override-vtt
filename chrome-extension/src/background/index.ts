import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

console.log('Background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");

const destinationHref = 'learn.deeplearning.ai/courses/';
let lastUrl = '';

// @Todo 모든 탭에대해서 관찰하기 때문에 비효율적이긴 하고, 콘텐츠에서 탭 id 를 주면 좋을듯.
chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
  console.log('onHistoryStateUpdated');
  if (details.url) {
    const tabId = details.tabId;
    chrome.tabs.get(tabId, tab => {
      console.log('Current tab:', tab);
      console.log('lastURl:', lastUrl);
      console.log('lastURl:', tab.url);

      if (tab.active) {
        // 앞/뒤 네비게이션 케이스에 동일하게 나옴
        if (lastUrl === tab.url) return;

        if (!lastUrl.includes(destinationHref) && details.url.includes(destinationHref)) {
          console.log(`Tab ${tabId} is onDestination`);
          chrome.tabs.sendMessage(tabId, { message: 'onDestination' });
        }
        if (lastUrl.includes(destinationHref) && !details.url.includes(destinationHref)) {
          console.log(`Tab ${tabId} is offDestination`);
          chrome.tabs.sendMessage(tabId, { message: 'offDestination' });
        }

        lastUrl = details.url;
      }
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('Service worker installed');
});

chrome.runtime.onStartup.addListener(() => {
  console.log('Service worker started');
});

chrome.runtime.onSuspend.addListener(() => {
  console.log('Service worker suspended');
});
