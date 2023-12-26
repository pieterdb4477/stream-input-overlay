import {Inject, Injectable, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {BehaviorSubject, EMPTY, fromEvent, Observable, Subject} from "rxjs";
import {InputController} from "../shared/domain/input-controller";
import {GamepadController} from "../shared/domain/gamepad-controller";

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  private readonly window: Window;
  public gamepadDisconnected$: Observable<GamepadEvent> = EMPTY;
  public gamepadConnected$: Observable<GamepadEvent> = EMPTY;
  private _inputControllers$: Subject<InputController[]> = new BehaviorSubject<InputController[]>([]);
  private _inputControllers: InputController[] = [];

  constructor(@Inject(DOCUMENT) document: Document) {
    this.window = document.defaultView as Window;
    this.init();
  }

  private init(): void {
    console.debug('Binding events')
    this.gamepadConnected$ = fromEvent<GamepadEvent>(this.window, "gamepadconnected")
    this.gamepadDisconnected$ = fromEvent<GamepadEvent>(this.window, "gamepaddisconnected")
    this.updateGamepadList();
    this.gamepadConnected$.subscribe(() => this.updateGamepadList());
  }

  private updateGamepadList(): void {
    console.debug('Enumerating gamepads')
    if (navigator.getGamepads === null) {
      throw new Error("Gamepads shouldn't be null");
    }
    let gamepads: Gamepad[] = (navigator.getGamepads() as Gamepad[])
      .filter(gamepad => gamepad != null);
    if (gamepads.length === 0) {
      console.warn("No gamepads connected")
      this.inputControllers = [];
      return;
    }
    this.inputControllers = gamepads.map(gamepad => new GamepadController(gamepad, window));
  }

  private set inputControllers(inputController: InputController[]) {
    this._inputControllers = inputController;
    this._inputControllers$.next(inputController);
  }

  private get inputControllers() : InputController[] {
    return this._inputControllers;
  }

  public get inputControllers$(): Observable<InputController[]> {
    return this._inputControllers$;
  }

  public forceUpdate(): void {
    this.updateGamepadList();
  }

}
