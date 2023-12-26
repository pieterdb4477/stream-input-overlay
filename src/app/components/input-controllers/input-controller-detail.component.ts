import {Component, Input} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {VisualizerButtonComponent} from "../visualizers/visualizer-button/visualizer-button.component";
import {VisualizerSliderComponent} from "../visualizers/visualizer-slider/visualizer-slider.component";
import {InputController} from "../../shared/domain/input-controller";

@Component({
  selector: 'app-input-controller-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    VisualizerButtonComponent,
    VisualizerSliderComponent
  ],
  templateUrl: './input-controller-detail.component.html',
  styleUrl: './input-controller-detail.component.scss'
})
export class InputControllerDetailComponent {

  @Input()
  public controller!: InputController;



}
