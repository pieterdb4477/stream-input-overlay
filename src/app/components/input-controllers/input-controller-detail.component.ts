import {Component, Input} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {VisualizerButtonComponent} from "../visualizers/visualizer-button/visualizer-button.component";
import {VisualizerSliderComponent} from "../visualizers/visualizer-slider/visualizer-slider.component";
import {InputController} from "../../shared/domain/input-controller";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {
  VisualizerDirectionalPadComponent
} from "../visualizers/visualizer-directional-pad/visualizer-directional-pad.component";
import {VisualizerThumbstickComponent} from "../visualizers/visualizer-thumbstick/visualizer-thumbstick.component";

@Component({
  selector: 'app-input-controller-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    VisualizerButtonComponent,
    VisualizerSliderComponent,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    VisualizerDirectionalPadComponent,
    VisualizerThumbstickComponent,
  ],
  templateUrl: './input-controller-detail.component.html',
  styleUrl: './input-controller-detail.component.scss'
})
export class InputControllerDetailComponent {
  // @ts-ignore
  private _controller: InputController;
  // @ts-ignore
  public nameControl: FormControl;


  @Input()
  public set controller(controller: InputController) {
    this._controller = controller;
    this.nameControl = new FormControl(controller.name);
    this.nameControl.valueChanges.subscribe(nextName => controller.name = nextName);
  }

  public get controller(): InputController {
    return this._controller;
  }

  public get ready(): boolean {
    return !!(this._controller && this.nameControl);
  }

}
