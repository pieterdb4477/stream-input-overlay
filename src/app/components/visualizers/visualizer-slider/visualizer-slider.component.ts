import {Component, Input} from '@angular/core';
import {SafeHtml, SafeStyle} from "@angular/platform-browser";

@Component({
  selector: 'app-visualizer-slider',
  standalone: true,
  imports: [],
  templateUrl: './visualizer-slider.component.html',
  styles: ``
})
export class VisualizerSliderComponent {
  @Input()
  public value: number | null = 0;

  private readonly max = 1;

  public get positive(): boolean {
    return (this.value || 0) >= 0;
  }

  public get absolutePercent(): SafeStyle {
    if (this.value === null) {
      return '0%'
    }
    const percentage = ((Math.abs(this.value) || 0) / this.max * 100);
    return `${percentage}%`;
  }

}
