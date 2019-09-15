import { isDefined } from '../utils/utils';

export function initWebPageStateDetect(): void {
  if (isDefined(window.browserUtils)) return;

  window.browserUtils = { isWebPageActiveState: undefined };
  window.addEventListener('focus', onFocus);
  window.addEventListener('blur', onBlur);
}

export function isWebPageActive(): boolean {
  const { browserUtils } = window;

  if (!isDefined(browserUtils) || !isDefined(browserUtils.isWebPageActiveState)) {
    throw new Error(`Trying to get current web page's state before initialize state detector `);
  }

  return Boolean(browserUtils.isWebPageActiveState);
}


export function stopWebPageStateDetect(): void {
  if (!isDefined(window.browserUtils)) return;

  window.removeEventListener('focus', onFocus);
  window.removeEventListener('blur', onBlur);
}

export function setOnTabActiveCallBack(cb: () => void): void {
  window.browserUtils = { ...window.browserUtils, onFocusCB: cb };
}

export function setOnTabInActiveCallBack(cb: () => void): void {
  window.browserUtils = { ...window.browserUtils, onBlurCB: cb };
}

function onFocus(): void {
  if (isDefined(window.browserUtils.onFocusCB)) window.browserUtils.onFocusCB();
  setWebPageStateActive();
}

function onBlur(): void {
  if (isDefined(window.browserUtils.onBlurCB)) window.browserUtils.onBlurCB();
  setWebPageStateInactive();
}

function setWebPageStateActive(): void {
  window.browserUtils = { ...window.browserUtils, isWebPageActiveState: true };
}

function setWebPageStateInactive(): void {
  window.browserUtils = { ...window.browserUtils, isWebPageActiveState: false };
}

declare global {
  interface Window {
    browserUtils: BrowserUtils;
  }
}

interface BrowserUtils {
  readonly onFocusCB?: () => void;
  readonly onBlurCB?: () => void;
  readonly isWebPageActiveState: boolean | undefined;
}