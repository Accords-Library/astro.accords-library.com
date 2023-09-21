import type { Observable } from "./micro-observables";

export class Elementos {
  readonly element: NodeListOf<Element>;
  constructor(readonly selector: string) {
    this.element = document.querySelectorAll(selector)!;
  }

  onClick(listener: () => void) {
    this.element.forEach((e) => e.addEventListener("click", listener));
  }

  setClass(
    className: string | { ifTrue: string; ifFalse: string },
    observable: Observable<boolean>
  ) {
    observable.subscribe((val) => {
      this.element.forEach((e) => {
        if (typeof className === "string") {
          e.classList.toggle(className, val);
        } else {
          e.classList.toggle(className.ifFalse, val === false);
          e.classList.toggle(className.ifTrue, val === true);
        }
      });
    });
  }
}
