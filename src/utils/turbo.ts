export const onLoad = (callback: () => void) =>
  document.documentElement.addEventListener("turbo:load", callback);
