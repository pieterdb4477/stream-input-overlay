import {Component, Input} from '@angular/core';
import {ThumbStick} from "../../../shared/domain/input-controller";
import {AsyncPipe} from "@angular/common";
import {combineLatest} from "rxjs";
import {Line, lineAngle, lineRotate} from 'geometric'

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
  private readonly MAX_OFFSET = 100;

  public readonly backCircleRadius = 230;

  public horizontalPosition: number = this.MIDDLE;
  public verticalPosition: number = this.MIDDLE;
  public horizontalPosition2: number = this.MIDDLE;
  public verticalPosition2: number = this.MIDDLE;

  public horizontalValue: number = 0;
  public verticalValue: number = 0;

  public angle: number = 0;
  public blipPosition: [number, number] = [this.MIDDLE, 0];

  @Input()
  set thumbStick(thumbStick: ThumbStick) {
    thumbStick.horizontalAxis.value.subscribe(
      nextHorizontalValue => {
        this.horizontalValue = nextHorizontalValue;
        const distance = nextHorizontalValue * this.MAX_OFFSET;
        this.horizontalPosition = this.MIDDLE + distance;
        this.horizontalPosition2 = this.MIDDLE + (distance * .8);
      }
    )
    thumbStick.verticalAxis.value.subscribe(
      nextVerticalValue => {
        this.verticalValue = nextVerticalValue;
        const distance = nextVerticalValue * this.MAX_OFFSET;
        this.verticalPosition = this.MIDDLE + distance;
        this.verticalPosition2 = this.MIDDLE + (distance * .8);
      }
    )
    combineLatest({
      horizontal: thumbStick.horizontalAxis.value,
      vertical: thumbStick.verticalAxis.value
    }).subscribe(({horizontal, vertical}) => {
      this.angle = lineAngle([[0, 0], [horizontal, vertical]]) - 90;
      let lineToBlip: Line = [[this.MIDDLE, this.MIDDLE], [this.MIDDLE, this.MIDDLE + (this.backCircleRadius)]]
      lineToBlip = lineRotate(lineToBlip, this.angle, [this.MIDDLE, this.MIDDLE]);
      this.blipPosition = lineToBlip[1];
    })
  }
}
