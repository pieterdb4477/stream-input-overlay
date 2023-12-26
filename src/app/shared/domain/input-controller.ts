import {Observable} from "rxjs";

export interface InputController {
  readonly kind: string;
  readonly id: string;
  readonly axes: Axis[];
  readonly buttons: Button[];
  readonly hotSwappable: boolean;
  pollingRate: number | 'no-polling';
}

export interface Axis {
  readonly index: number;
  name: string;
  value: Observable<number>
}

export interface Button {
  readonly name: string;
  readonly index: number;
  value: Observable<boolean>
}

