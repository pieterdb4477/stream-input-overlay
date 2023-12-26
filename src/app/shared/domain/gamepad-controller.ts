import {Axis, Button, DirectionPad, InputController, ThumbStick} from "./input-controller";
import {BehaviorSubject, distinct, interval, Observable, Subscription} from "rxjs";

export class GamepadController implements InputController {

  private polling: Subscription;
  readonly kind = 'GamePad';
  readonly id: string
  readonly axes: GamepadAxis[] = [];
  readonly buttons: GamepadButton[] = [];
  readonly hotSwappable = true;
  readonly name: string;
  directionalPads: DirectionPad[] = [];
  thumbSticks: ThumbStick[] = [];

  constructor(gamepad: Gamepad, public pollingRate = 100) {
    this.id = gamepad.id;
    this.axes = gamepad.axes.map((value, index) => new GamepadAxis(index, gamepad.index));
    this.buttons = gamepad.buttons.map((value, index) => new GamepadButton(index, gamepad.index));
    this.name = this.parseName(gamepad);
    this.id = this.parseId(gamepad);
    //TODO PDB : polling rate won't change the interval on change
    this.polling = interval(pollingRate).subscribe((intervalNumber) => {
      this.axes.forEach(axis => axis.poll());
      this.buttons.forEach(button => button.poll());
    });

    if (gamepad.id.includes('STANDARD GAMEPAD')) {
      console.debug(`gamepad ${gamepad.id} seems to have a default layout, assigning axes to thumbsticks`)
      this.autoAssignThumbsticks();
      this.autoAssignDirectionalPads();
    }
  }

  private parseId(gamepad: Gamepad): string {
    const vendorRegex = /Vendor: ([a-z0-9]+)/;
    const productRegex = /Product: ([a-z0-9]+)/;
    const vendorResult = vendorRegex.exec(this.id);
    const productResult = productRegex.exec(this.id);
    if (vendorResult === null || productResult == null) {
      console.warn(`Could not parse details from gamepad id '${gamepad.id}'`)
      return gamepad.id;
    } else {
      return `${vendorResult[1]}:${productResult[1]}`;
    }
  }

  private parseName(gamepad: Gamepad): string {
    const nameParseRegex = /^(.*?)\(/;
    const regexResult = nameParseRegex.exec(gamepad.id);

    if (regexResult === null || !regexResult[1]) {
      console.warn(`Could not parse name from ${gamepad.id}`)
      return gamepad.id;
    } else {
      return regexResult[1].trim();
    }
  }

  private autoAssignThumbsticks() {
    this.thumbSticks = [
      {
        verticalAxis: this.axes[1],
        horizontalAxis: this.axes[0]
      }, {
        verticalAxis: this.axes[3],
        horizontalAxis: this.axes[2]
      }
    ]
  }

  private autoAssignDirectionalPads() {
    this.directionalPads = [
      {
        up: this.buttons[12],
        down: this.buttons[13],
        left: this.buttons[14],
        right: this.buttons[15],
      }
    ]
  }
}

class GamepadAxis implements Axis {
  readonly valueSubject = new BehaviorSubject<number>(0);
  public name: string;

  get value(): Observable<number> {
    return this.valueSubject.pipe(
      distinct()
    );
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
    );
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
