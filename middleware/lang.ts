import acceptLanguage from "accept-language";
import type { Handler } from "hono";
import { appConstants } from "../constants";

acceptLanguage.languages(appConstants.supportedLanguages);

export const langRewriteHandler: Handler = async (c, next) => {
  const { origin, pathname } = new URL(c.req.url);
  if (alreadyHasLanguageCode(pathname)) {
    c.set("REWRITE", c.req.url);
  } else {
    const language = acceptLanguage.get(c.req.headers.get("accept-language"));
    const newUrl = `${origin}/${language}${pathname}`;
    c.set("REWRITE", newUrl);
  }
  await next();
};

const alreadyHasLanguageCode = (pathname: string): boolean => {
  return appConstants.supportedLanguages.some((lang) => {
    const prefix = `/${lang}`;
    if (pathname.length === prefix.length) {
      return pathname === prefix;
    }
    return pathname.startsWith(`${prefix}/`);
  });
};
