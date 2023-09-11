import type { Observable } from "./micro-observables";

export class Elementos {
  readonly element: HTMLElement;
  constructor(readonly selector: string) {
    this.element = document.querySelector(selector)!;
  }

  onClick(listener: () => void) {
    this.element.addEventListener("click", listener);
  }

  setClass(
    className: string | { ifTrue: string; ifFalse: string },
    observable: Observable<boolean>
  ) {
    observable.subscribe((val) => {
      if (typeof className === "string") {
        this.element.classList.toggle(className, val);
      } else {
        this.element.classList.toggle(className.ifFalse, val === false);
        this.element.classList.toggle(className.ifTrue, val === true);
      }
    });
  }
}
