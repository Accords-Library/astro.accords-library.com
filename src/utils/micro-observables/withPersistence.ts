import { WritableObservable, observable } from ".";
import Cookies from "js-cookie";

export const observableWithPersistence = <T>(
  cookieKey: string,
  defaultValue: T
): WritableObservable<T> => {
  const valueFromCookie: T | null = JSON.parse(
    Cookies.get(cookieKey) ?? "null"
  );
  const obs = observable(valueFromCookie ?? defaultValue);
  obs.subscribe((val) => Cookies.set(cookieKey, JSON.stringify(val)));
  return obs;
};
