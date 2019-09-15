import { isDefined } from './utils';

export function initWebPageStateDetect(): void {
  window.browserUtils = { isWebPageActiveState: true };
  window.addEventListener('focus', setWebPageStateActive);
  window.addEventListener('blur', setWebPageStateInactive);
}

export function isWebPageActive(): boolean {
  const { browserUtils } = window;

  if (!isDefined(browserUtils) || !isDefined(browserUtils.isWebPageActiveState)) {
    throw new Error(`Trying to get current web page's state before initialize state detector `);
  }

  return Boolean(browserUtils.isWebPageActiveState);
}

export function stopWebPageStateDetect(): void {
  window.removeEventListener('focus', setWebPageStateActive);
  window.removeEventListener('blur', setWebPageStateInactive);
}

function setWebPageStateActive(): void {
  window.browserUtils.isWebPageActiveState = true;
}

function setWebPageStateInactive(): void {
  window.browserUtils.isWebPageActiveState = false;
}

declare global {
  interface Window {
    browserUtils: {
      isWebPageActiveState: boolean
    };
  }
}