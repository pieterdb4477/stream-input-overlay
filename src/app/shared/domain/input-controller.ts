import {Observable} from "rxjs";

export interface InputController {
  readonly kind: string;
  readonly id: string;
  readonly axes: Axis[];
  readonly buttons: Button[];
  readonly hotSwappable: boolean;
  pollingRate: number | 'no-polling';
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

