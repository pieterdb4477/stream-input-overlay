import {DirectionalPad, InputController, ThumbStick} from "../input-controller";
import {interval, Subscription} from "rxjs";
import {GamepadAxis, GamepadButton} from "./gamepad-controller-entity";

export class GamepadController implements InputController {

  private polling: Subscription;
  readonly kind = 'GamePad';
  directionalPads: DirectionalPad[] = [];
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
}

export type GamepadControllerStorage = {
  id: string;
  name: string;
  pollingRate: number;
  axes: GamepadAxisStorage[];
  buttons: GamepadButtonStorage[];
  directionalPads: DirectionalPadStorage[];
  thumbSticks: ThumbStickStorage[];
}

export type GamepadAxisStorage = {
  name: string;
  index: number;
}
export type GamepadButtonStorage = {
  name: string;
  index: number;
}
export type DirectionalPadStorage = {
  upIndex: number,
  downIndex: number,
  leftIndex: number,
  rightIndex: number,
}
export type ThumbStickStorage = {
  horizontalId: number;
  verticalId: number;
}
