import { sampleFunction } from '@src/sampleFunction';

console.log('content script loaded');

let lastUrl = '';
//@Todo background script 와 중복. 통합 필요.
const destinationHref = 'learn.deeplearning.ai/courses/';

init();

function init() {
  checkUrlAndExecute();
  registerEvents();
  // sampleFunction();
}

function registerEvents() {
  // @Todo (예: history.replaceState 사용)도 처리해야 하는지 고려해야 합니다.
  window.addEventListener('popstate', checkUrlAndExecute);
}

/**
 * Translates the caption on the page.
 * This function prevents multiple calls by using a flag `isOn`.
 * It sets `isOn` to true to indicate that translation has started and returns immediately if it's already true.
 */
function translateCaption() {
  console.log('자막번역 시작');
}

function checkUrlAndExecute() {
  const pageChanged = window.location.href !== lastUrl;
  const onDestination = window.location.href.includes(destinationHref);
  const offDestination = lastUrl.includes(destinationHref);

  if (!lastUrl || pageChanged) {
    // console.log('현재 위치:', window.location.href, '목적 href:', destinationHref);
    if (onDestination) {
      console.log('목적 페이지 진입. Executing code.');
      translateCaption();
    }
    if (offDestination) {
      console.log('목적 페이지 탈출. Executing code.');
    }
  }
  updateLastUrl();
}

function updateLastUrl() {
  lastUrl = window.location.href;
}
