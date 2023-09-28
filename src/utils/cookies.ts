import { type AstroCookies } from "astro";

type AstroCookie = ReturnType<AstroCookies["get"]>;

export const parseCookie = <T>(cookies: AstroCookie, defaultValue: T): T => {
  const value: T | null = JSON.parse(cookies?.value ?? "null");
  return value ?? defaultValue;
};

export enum CookieNames {
  MENU_PANEL_REDUCED = "menuPanelReduced",
  THEME_COLOR = "themeColor",
}
