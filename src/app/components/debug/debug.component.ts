import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {interval, Observable, Subscription} from "rxjs";
import {InputController} from "../../shared/domain/input/input-controller";

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './debug.component.html',
  styles: ``
})
export class DebugComponent implements OnInit, OnDestroy {

  public inputControllers$: Observable<InputController[]> | undefined;
  public supportedByBrowser = !!navigator['getGamepads'];
  public axesDebug: string = 'waiting';
  public buttonsDebug: string = 'waiting';
  private polling: Observable<number> | undefined;
  public intervalIndex = 0;

  constructor() {
    const gamepads = navigator.getGamepads();
  }

  ngOnDestroy(): void {
  }


  protected readonly isSecureContext = isSecureContext;

  ngOnInit(): void {
    this.polling = interval(300);
    this.polling.subscribe(nextIntervalIndex => {
      this.intervalIndex = nextIntervalIndex
      this.debugAxes();
      this.debugButtons();
    });
  }

  private debugAxes() {
    this.axesDebug = navigator.getGamepads()
      .filter(gp => gp != null)
      .map(gamepad => {
        // @ts-ignore
        return gamepad.axes.map((value, index) => `${gamepad.index}x${index}: ${value}`)
          .join('\n');
      })
      .join('\n');
  }

  private debugButtons() {
    this.buttonsDebug = navigator.getGamepads()
      .filter(gp => gp != null)
      .map(gamepad => {
        // @ts-ignore
        return gamepad.buttons.map((value, index) => `${gamepad.index}x${index}: ${value.pressed}`)
          .join('\n');
      })
      .join('\n');
  }
}
