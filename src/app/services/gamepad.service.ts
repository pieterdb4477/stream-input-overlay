import {Inject, Injectable, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {BehaviorSubject, EMPTY, fromEvent, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GamepadService {
  private readonly window: Window;
  public gamepadDisconnected$: Observable<GamepadEvent> = EMPTY;
  public gamepadConnected$: Observable<GamepadEvent> = EMPTY;
  private _gamepads$: Subject<Gamepad[]> = new BehaviorSubject<Gamepad[]>([]);

  constructor(@Inject(DOCUMENT) document: Document) {
    this.window = document.defaultView as Window;
    this.init();
  }

  private init(): void {
    console.debug('Binding events')
    this.gamepadConnected$ = fromEvent<GamepadEvent>(this.window, "gamepadconnected")
    this.gamepadDisconnected$ = fromEvent<GamepadEvent>(this.window, "gamepaddisconnected")
    this.updateGamepadList();
  }

  private updateGamepadList(): void {
    debugger;
    console.debug('Enumerating gamepads')
    if (navigator.getGamepads === null) {
      throw new Error("Gamepads shouldn't be null");
    }
    let gamepads: Gamepad[] = navigator.getGamepads() as Gamepad[];
    console.debug('raw gamepad list:', gamepads);
    // Gamepads may list disconnected gamepads as null.
    this._gamepads$.next(gamepads.filter(gamepad => gamepad != null));
  }

  public get gamepads$(): Observable<Gamepad[]> {
    return this._gamepads$;
  }

  public forceUpdate() : void {
    this.updateGamepadList();
  }

}
