export const getLocalizedUrl = (url: string, locale: string = "en"): string =>
  `/${locale}${url}`;
