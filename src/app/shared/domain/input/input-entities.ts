import {Storable} from "../storable";
import {Observable} from "rxjs";

/**
 * Represents any input or group of inputs that can be bound to a visualisation.
 *
 */
export interface InputEntity<T> extends Storable {
  get value(): Observable<T>;

  isOfKind(kind: InputEntityKind): boolean;
}

export enum InputEntityKind {
  'Button', 'Axis', 'DirectionalPad', 'ThumbStick'
}

export class Axis implements InputEntity<number> {

  constructor(public id: string, public readonly value: Observable<number>, public name: string = '') {
  }

  isOfKind(kind: InputEntityKind): boolean {
    return kind == InputEntityKind.Axis
  }
}
export class Button implements InputEntity<boolean> {

  constructor(public id: string, public readonly value: Observable<boolean>, public name: string = '') {
  }

  isOfKind(kind: InputEntityKind): boolean {
    return kind == InputEntityKind.Button
  }
}

export class DirectionalPad implements InputEntity<DirectionalPadButtons> {

  constructor(public id: string, public readonly value: Observable<DirectionalPadButtons>, public name: string = '') {
  }

  isOfKind(kind: InputEntityKind): boolean {
    return kind == InputEntityKind.DirectionalPad
  }
}

type DirectionalPadButtons = {
  up: boolean;
  right: boolean;
  down: boolean;
  left: boolean;
}

export class ThumbStick implements InputEntity<ThumbStickAxes> {

  constructor(public id: string, public readonly value: Observable<ThumbStickAxes>, public name: string = '') {
  }

  isOfKind(kind: InputEntityKind): boolean {
    return kind == InputEntityKind.ThumbStick
  }
}

export type ThumbStickAxes = {
  horizontal: number;
  vertical: number;
}
