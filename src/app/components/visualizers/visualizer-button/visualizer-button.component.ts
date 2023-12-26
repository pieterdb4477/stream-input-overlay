import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-visualizer-button',
  standalone: true,
  imports: [],
  templateUrl: './visualizer-button.component.html',
  styleUrl: './visualizer-button.component.scss'
})
export class VisualizerButtonComponent {
  @Input()
  value: string | number = 'x';

  @Input()
  buttonActive: boolean | null = false;
}
