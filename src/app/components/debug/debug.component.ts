import {Component, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {GamepadService} from "../../services/gamepad.service";
import {Observable} from "rxjs";

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
export class DebugComponent implements OnInit {

  public gamepads$: Observable<Gamepad[]> | undefined;
  public supportedByBrowser = !!navigator['getGamepads'];


  constructor(private gamepadService: GamepadService) {
  }

  ngOnInit(): void {
    this.gamepads$ = this.gamepadService.gamepads$;
  }

  public refresh(): void {
    this.gamepadService.forceUpdate();
  }

  protected readonly isSecureContext = isSecureContext;

}
