import {Component, Input} from '@angular/core';
import {DirectionalPad, ThumbStick} from "../../../shared/domain/input-controller";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-visualizer-directional-pad',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './visualizer-directional-pad.component.html',
  styleUrl: './visualizer-directional-pad.component.scss'
})
export class VisualizerDirectionalPadComponent {
  @Input() directionalPad!: DirectionalPad;
}
