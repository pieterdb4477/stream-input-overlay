import {Component, Input} from '@angular/core';
import {ThumbStick} from "../../../shared/domain/input-controller";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-visualizer-thumbstick',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './visualizer-thumbstick.component.html',
  styleUrl: './visualizer-thumbstick.component.scss'
})
export class VisualizerThumbstickComponent {

  /**
   * Amount of circles of the middle of the SVG image.
   * @private
   */
  private readonly MIDDLE = 250;

  /**
   * Max amount of movement the thumb stick may do from the
   * @private
   */
  private readonly MAX_OFFSET = 200;

  public horizontalPosition: number = this.MIDDLE;
  public verticalPosition: number = this.MIDDLE;
  public horizontalValue: number = 0;
  public verticalValue: number = 0;

  @Input()
  set thumbStick(thumbStick: ThumbStick) {
    thumbStick.horizontalAxis.value.subscribe(
      nextHorizontalValue => {
        this.horizontalValue = nextHorizontalValue;
        this.horizontalPosition = this.MIDDLE + (nextHorizontalValue * this.MAX_OFFSET);
      }
    )
    thumbStick.verticalAxis.value.subscribe(
      nextVerticalValue => {
        this.verticalValue = nextVerticalValue;
        this.verticalPosition = this.MIDDLE + (nextVerticalValue * this.MAX_OFFSET);
      }
    )
  }
}
