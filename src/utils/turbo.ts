export const onLoad = (callback: () => void) =>
  document.documentElement.addEventListener("turbo:load", callback);

export const onRequestStart = (callback: () => void) =>
  document.documentElement.addEventListener(
    "turbo:before-fetch-request",
    callback
  );

export const onRequestEnd = (callback: () => void) =>
  document.documentElement.addEventListener(
    "turbo:render",
    callback
  );
