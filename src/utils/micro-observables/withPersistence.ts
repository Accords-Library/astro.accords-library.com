import { WritableObservable, observable } from ".";
import Cookies from "js-cookie";

export const observableWithPersistence = <T>(
  cookieKey: string,
  defaultValue: T
): WritableObservable<T> => {
  const valueFromCookie = Cookies.get(cookieKey) as T | undefined;
  const obs = observable(valueFromCookie ?? defaultValue);
  obs.subscribe((val) => Cookies.set(cookieKey, val as string));
  return obs;
};
