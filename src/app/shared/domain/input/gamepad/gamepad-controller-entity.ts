import {BehaviorSubject, Observable} from "rxjs";
import {InputEntity, InputEntityKind} from "../input-entities";

/**
 * Any entities whose value is based on the Gamepad API
 */
export abstract class GamepadEntity<T> implements InputEntity<T> {
  private readonly valueSubject: BehaviorSubject<T>;

  protected constructor(defaultEmittedValue: T,
                        public name: string,
                        public index: number,
                        public id: string
  ) {
    this.valueSubject = new BehaviorSubject<T>(defaultEmittedValue);
  }

  /**
   * Updates and emits the values of this gamepad.
   */
  poll() {
    this.valueSubject.next(this.retrieveNextValue());
  }

  get value(): Observable<T> {
    return this.valueSubject;
  }

  protected abstract retrieveNextValue(): T;

  abstract isOfKind(kind: InputEntityKind): boolean;
}

export function isGamepadEntity(input: unknown): input is GamepadEntity<unknown> {
  return (input as GamepadEntity<any>).poll !== undefined && (input as GamepadEntity<any>).index !== undefined ;
}

export class GamepadButton extends GamepadEntity<boolean> {

  constructor(index: number, private gamepadIndex: number, gamepadId: string) {
    super(false, `Button ${index}`, index, `${gamepadId}:button:${gamepadIndex}`);
  }

  protected retrieveNextValue(): boolean {
    return navigator.getGamepads()[this.gamepadIndex]?.buttons[this.index]?.pressed || false;
  }

  isOfKind(kind: InputEntityKind): boolean {
    return kind == InputEntityKind.Button;
  }

}

export class GamepadAxis extends GamepadEntity<number> {

  constructor(index: number, private gamepadIndex: number, gamepadId: string) {
    super(0, `Axis ${index}`, index, `${gamepadId}:axis:${gamepadIndex}`);
  }

  private precision = 100;

  protected retrieveNextValue(): number {
    let number = navigator.getGamepads()[this.gamepadIndex]?.axes[this.index] || 0;
    return Math.round((number * this.precision)) / this.precision;
  }

  isOfKind(kind: InputEntityKind): boolean {
    return kind == InputEntityKind.Axis;
  }

}

