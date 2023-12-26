import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {InputController} from "../../shared/domain/input-controller";
import {ControllerService} from "../../services/controller.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {VisualizerSliderComponent} from "../visualizers/visualizer-slider/visualizer-slider.component";

@Component({
  selector: 'app-input-controllers',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    VisualizerSliderComponent
  ],
  templateUrl: './input-controllers.component.html',
  styles: ``
})
export class InputControllersComponent {
  public inputControllers$: Observable<InputController[]> | undefined;


  constructor(private gamepadService: ControllerService) {
  }

  ngOnInit(): void {
    this.inputControllers$ = this.gamepadService.inputControllers$;
  }

  public refresh(): void {
    this.gamepadService.forceUpdate();
  }

}
