import {Storable} from "../storable";
import {InputEntity} from "./input-entities";

export interface InputController extends Storable{
  pollingRate: number | 'no-polling';
  entities: InputEntity<unknown>[];
}
