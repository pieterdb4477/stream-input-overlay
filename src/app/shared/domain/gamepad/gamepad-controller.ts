import {DirectionPad, InputController, ThumbStick} from "../input-controller";
import {interval, Subscription} from "rxjs";
import {GamepadAxis, GamepadButton} from "./gamepad-controller-entity";

export class GamepadController implements InputController {

  private polling: Subscription;
  readonly kind = 'GamePad';
  directionalPads: DirectionPad[] = [];
  thumbSticks: ThumbStick[] = [];
  readonly hotSwappable = true;

  constructor(
    public readonly id: string,
    public readonly axes: GamepadAxis[] = [],
    public readonly buttons: GamepadButton[] = [],
    public name: string,
    public pollingRate: number
  ) {
    //TODO PDB : polling rate won't change the interval on change
    this.polling = interval(pollingRate).subscribe(() => {
      this.axes.forEach(axis => axis.poll());
      this.buttons.forEach(button => button.poll());
    });
  }

  static fromNavigatorDetectedGamepad(gamepad: Gamepad, pollingRate: number = 50): GamepadController {
    const gamepadController = new GamepadController(
        this.parseId(gamepad),
        gamepad.axes.map((value, index) => new GamepadAxis(index, gamepad.index)),
        gamepad.buttons.map((value, index) => new GamepadButton(index, gamepad.index)),
        this.parseName(gamepad),
        pollingRate
      )
    ;
    if (gamepad.id.includes('STANDARD GAMEPAD')) {
      console.debug(`gamepad ${gamepad.id} seems to have a default layout, assigning axes to thumbs ticks`)
      gamepadController.autoAssignThumbsticks();
      gamepadController.autoAssignDirectionalPads();
    }
    return gamepadController;
  }

  private static parseId(gamepad: Gamepad): string {
    const vendorRegex = /Vendor: ([a-z0-9]+)/;
    const productRegex = /Product: ([a-z0-9]+)/;
    const vendorResult = vendorRegex.exec(gamepad.id);
    const productResult = productRegex.exec(gamepad.id);
    if (vendorResult === null || productResult == null) {
      console.warn(`Could not parse details from gamepad id '${gamepad.id}'`)
      return gamepad.id;
    } else {
      return `${vendorResult[1]}:${productResult[1]}`;
    }
  }

  private static parseName(gamepad: Gamepad): string {
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
      },
      {
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

