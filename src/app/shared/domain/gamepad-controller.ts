import {Axis, Button, InputController} from "./input-controller";
import {BehaviorSubject, distinct, interval, Observable, Subscription, tap} from "rxjs";

export class GamepadController implements InputController {

  private polling: Subscription;
  readonly kind = 'GamePad';
  readonly id: string
  readonly axes: GamepadAxis[] = [];
  readonly buttons: GamepadButton[] = [];
  readonly hotSwappable = true;

  constructor(gamepad: Gamepad, window: Window, public pollingRate = 100) {
    this.id = gamepad.id;
    this.axes = gamepad.axes.map((value, index) => new GamepadAxis(index, gamepad.index));
    this.buttons = gamepad.buttons.map((value, index) => new GamepadButton(index, gamepad.index));
    //TODO PDB : pollingrate won't change the interval on change
    this.polling = interval(pollingRate).subscribe((intervalNumber) => {
      this.axes.forEach(axis => axis.poll());
      this.buttons.forEach(button => button.poll());
    });
  }
}

class GamepadAxis implements Axis {
  readonly valueSubject = new BehaviorSubject<number>(0);
  public name: string;

  get value(): Observable<number> {
    return this.valueSubject.pipe(
      distinct(),
      tap(nextValue => console.debug(`axis change ${this.name} -> ${nextValue}`)
      ));
  }

  constructor(public readonly index: number, public readonly gamepadIndex: number) {
    this.name = `axis ${index}`;
  }

  poll() {
    const value = navigator.getGamepads()[this.gamepadIndex]?.axes[this.index];
    if (value === undefined) {
      console.error("axis no longer exists");
      return
    }
    this.valueSubject.next(value);
  }
}
//TODO PDB lots of duplication between buttons and axes
class GamepadButton implements Button {
  readonly valueSubject = new BehaviorSubject<boolean>(false);
  private previousValue: boolean | null = null;
  public name: string;

  get value(): Observable<boolean> {
    return this.valueSubject.pipe(
      distinct(),
      tap(nextValue => console.debug(`button change ${this.name} -> ${nextValue}`)
      ));
  }

  constructor(public readonly index: number, public readonly gamepadIndex: number) {
    this.name = `button ${index}`;
  }

  poll() {
    const value = navigator.getGamepads()[this.gamepadIndex]?.buttons[this.index]?.pressed;
    if (value === undefined) {
      console.error("axis no longer exists");
      return
    }
    this.valueSubject.next(value);
  }
}
