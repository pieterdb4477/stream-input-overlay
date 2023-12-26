import {Observable} from "rxjs";

export interface InputController {
  readonly kind: string;
  readonly id: string;
  readonly axes: Axis[];
  readonly buttons: Button[];
  readonly hotSwappable: boolean;
  name: string;
  pollingRate: number | 'no-polling';
  directionalPads : DirectionPad[];
  thumbSticks: ThumbStick[];
}

export interface Axis extends InputControllerEntity<number>{
}

export interface Button extends InputControllerEntity<boolean> {
}

interface InputControllerEntity<T> {
  readonly name: string;
  readonly index: number;
  value: Observable<T>;
}

export type ThumbStick = {
  verticalAxis: Axis;
  horizontalAxis: Axis;
}

export type DirectionPad = {
  up : Button;
  down : Button;
  left : Button;
  right : Button;
}
