import {Component, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {ControllerService} from "../../services/controller.service";
import {Observable} from "rxjs";
import {InputController} from "../../shared/domain/input-controller";

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

  public inputControllers$: Observable<InputController[]> | undefined;
  public supportedByBrowser = !!navigator['getGamepads'];


  constructor(private gamepadService: ControllerService) {
  }

  ngOnInit(): void {
    this.inputControllers$ = this.gamepadService.inputControllers$;
  }

  public refresh(): void {
    this.gamepadService.forceUpdate();
  }

  protected readonly isSecureContext = isSecureContext;

}
