import {Component, Input} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {VisualizerButtonComponent} from "../visualizers/visualizer-button/visualizer-button.component";
import {VisualizerSliderComponent} from "../visualizers/visualizer-slider/visualizer-slider.component";
import {InputController} from "../../shared/domain/input/input-controller";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {
  VisualizerDirectionalPadComponent
} from "../visualizers/visualizer-directional-pad/visualizer-directional-pad.component";
import {VisualizerThumbstickComponent} from "../visualizers/visualizer-thumbstick/visualizer-thumbstick.component";
import {Axis, Button, DirectionalPad, InputEntityKind, ThumbStick} from "../../shared/domain/input/input-entities";

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
  private _controller!: InputController;
  public nameControl!: FormControl;
  public axes: Axis[] = [];
  public buttons: Button[] = [];
  public thumbsticks: ThumbStick[] = [];
  public directionalPads: DirectionalPad[] = [];


  @Input()
  public set controller(controller: InputController) {
    this._controller = controller;
    //TODO this doesn't scale well :/
    for (let entity of controller.entities) {
      if (entity.isOfKind(InputEntityKind.Axis)) {
        this.axes.push(entity as Axis);
      } else if (entity.isOfKind(InputEntityKind.Button)) {
        this.buttons.push(entity as Button)
      } else if (entity.isOfKind(InputEntityKind.DirectionalPad)) {
        this.directionalPads.push(entity as DirectionalPad);
      } else if (entity.isOfKind(InputEntityKind.ThumbStick)) {
        this.thumbsticks.push(entity as ThumbStick);
      }
    }
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
