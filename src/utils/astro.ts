import { type AstroCookies } from "astro";

type AstroCookie = ReturnType<AstroCookies["get"]>;

export const parseCookie = <T>(cookies: AstroCookie, defaultValue: T): T => {
  const value: T | null = JSON.parse(cookies?.value ?? "null");
  return value ?? defaultValue;
};
