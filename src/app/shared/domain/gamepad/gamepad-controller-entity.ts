import {Axis, Button} from "../input-controller";
import {BehaviorSubject, distinct, Observable} from "rxjs";

abstract class GamepadEntity<T extends number | boolean> {
  private readonly valueSubject: BehaviorSubject<T>;

  protected constructor(defaultEmittedValue: T,
                        public name: string,
                        public index: number
  ) {
    this.valueSubject = new BehaviorSubject<T>(defaultEmittedValue);
  }

  poll() {
    this.valueSubject.next(this.retrieveNextValue());
  }

  get value(): Observable<T> {
    return this.valueSubject.pipe(
      distinct(),
    );
  }

  protected abstract retrieveNextValue(): T;
}

export class GamepadButton extends GamepadEntity<boolean> implements Button {

  constructor(index: number, private gamepadIndex: number) {
    super(false, `${index}`, index);
  }

  protected retrieveNextValue(): boolean {
    return navigator.getGamepads()[this.gamepadIndex]?.buttons[this.index]?.pressed || false;
  }

}

export class GamepadAxis extends GamepadEntity<number> implements Axis {

  constructor(index: number, private gamepadIndex: number) {
    super(0, `${index}`, index);
  }

  protected retrieveNextValue(): number {
    return navigator.getGamepads()[this.gamepadIndex]?.axes[this.index] || 0;

  }

}
