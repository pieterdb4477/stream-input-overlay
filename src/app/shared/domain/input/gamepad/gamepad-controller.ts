import {interval, Subscription} from "rxjs";
import {GamepadAxis, GamepadButton, GamepadEntity, isGamepadEntity} from "./gamepad-controller-entity";
import {InputController} from "../input-controller";
import {InputEntity} from "../input-entities";

/**
 * Wrapper around a single Gamepad from the
 */
export class GamepadController implements InputController {

  private polling: Subscription;

  constructor(
    public readonly id: string,
    public name: string,
    public pollingRate: number,
    public entities: InputEntity<unknown>[]
  ) {
    //TODO PDB : polling rate won't change the interval on change
    this.polling = interval(pollingRate).subscribe(() => {
      entities.forEach(entity => {
        if (isGamepadEntity(entity)) {
          entity.poll();
        }
      })
    });
  }

  public getGamepadEntitiesByIndex(index: number) {
    return this.entities.find(e => (isGamepadEntity(e) && e.index === index));
  }
}
