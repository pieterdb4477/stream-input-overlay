import {Component, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {DirectionalPad} from "../../../shared/domain/input/input-entities";

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
