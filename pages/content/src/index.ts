import { sampleFunction } from '@src/sampleFunction';

console.log('content script loaded');

let newUrl: string = '';
let isTranslating = false;
//@Todo background script 와 중복. 통합 필요.
const destinationHref = 'learn.deeplearning.ai/courses/';

init();

function init() {
  updateNewUrl(window.location.href);
  checkUrlAndExecute(newUrl);
  registerEvents();
  // sampleFunction();
}

function registerEvents() {
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function (...args) {
    originalPushState.apply(this, args);
    console.log('originalPushState');
    updateNewUrl(window.location.href);
    checkUrlAndExecute(newUrl);
  };

  window.history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    console.log('replaceState');
    updateNewUrl(window.location.href);
    checkUrlAndExecute(newUrl);
  };

  // popstate 이벤트 리스너 추가
  window.addEventListener('popstate', () => {
    console.log('popstate');
    updateNewUrl(window.location.href);
    checkUrlAndExecute(newUrl);
  });
}

function startTranslateCaption() {
  console.log('자막번역 시작');
  isTranslating = true;
}

function stopTranslateCaption() {
  console.log('자막번역 중단');
  isTranslating = false;
}

function checkUrlAndExecute(newUrl: string) {
  const onDestination = newUrl.includes(destinationHref);

  console.log(newUrl);
  if (onDestination) {
    console.log('목적 페이지 진입. Executing code.');
    if (!isTranslating) startTranslateCaption();
  } else {
    console.log('목적 페이지 탈출. Executing code.');
    if (isTranslating) stopTranslateCaption();
  }
}

function updateNewUrl(currentHref: string) {
  console.log('새 URL: ' + currentHref);
  newUrl = currentHref;
}
