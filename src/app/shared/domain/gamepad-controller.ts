import {Axis, InputController} from "./input-controller";
import {BehaviorSubject, distinct, interval, Observable, Subscription} from "rxjs";

export class GamepadController implements InputController {

  private polling: Subscription;
  readonly kind = 'GamePad';
  readonly id: string
  readonly axes: GamepadAxis[] = [];
  readonly hotSwappable = true;

  constructor(gamePad: Gamepad, window: Window, public pollingRate = 100) {
    this.id = gamePad.id;
    this.axes = gamePad.axes.map((value, index) => new GamepadAxis(index, gamePad));
    //TODO PDB : pollingrate won't change the interval on change
    this.polling = interval(pollingRate).subscribe(() => {
      this.axes.forEach(axis => axis.poll());
    });
  }
}

class GamepadAxis implements Axis {
  readonly index: number;
  readonly valueSubject = new BehaviorSubject<number>(0);
  public name: string;

  get value(): Observable<number> {
    return this.valueSubject.pipe(
      // distinct()
    );
  }

  constructor(index: number, private gamePad: Gamepad) {
    this.index = index
    this.name = `axis ${index}`;
  }

  poll() {
    this.valueSubject.next(this.gamePad.axes[this.index]);
    if(this.index === 0) console.debug(this.gamePad.axes[this.index]);
  }

}
