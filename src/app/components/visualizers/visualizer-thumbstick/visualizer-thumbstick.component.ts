import {Component, Input} from '@angular/core';
import {ThumbStick} from "../../../shared/domain/input-controller";
import {AsyncPipe} from "@angular/common";
import {combineLatest} from "rxjs";
import {Line, lineAngle, lineRotate} from 'geometric'
import {
  InputKind,
  Visualizer,
  VisualizerContext,
  VisualizerDescription
} from "../../../shared/domain/visualizer-configuration";

@Component({
  selector: 'app-visualizer-thumbstick',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './visualizer-thumbstick.component.html',
  styleUrl: './visualizer-thumbstick.component.scss'
})
export class VisualizerThumbstickComponent implements Visualizer {

  description: VisualizerDescription = {
    title: 'Thumbstick',
    description: 'Shows a thumbstick graphic from top-down moving around',
    inputs: [
      {
        kind: InputKind.ThumbStick,
        label: 'Thumbstick',
        key: 'thumbstick'
      }
    ]
  }

  @Input()
  set context(context: VisualizerContext) {
    this.thumbStick = context.thumbSticks['thumbstick'];
  }

  @Input()
  set thumbStick(thumbStick: ThumbStick) {
    thumbStick.horizontalAxis.value.subscribe(
      nextHorizontalValue => {
        this.horizontalValue = nextHorizontalValue;
        const distance = nextHorizontalValue * this.MAX_OFFSET;
        this.horizontalPosition = this.MIDDLE + distance;
      }
    )
    thumbStick.verticalAxis.value.subscribe(
      nextVerticalValue => {
        this.verticalValue = nextVerticalValue;
        const distance = nextVerticalValue * this.MAX_OFFSET;
        this.verticalPosition = this.MIDDLE + distance;
      }
    )
    combineLatest({
      horizontal: thumbStick.horizontalAxis.value,
      vertical: thumbStick.verticalAxis.value
    }).subscribe(({horizontal, vertical}) => {
      this.force = Math.max(Math.abs(horizontal), Math.abs(vertical));
      if (this.active) {
        this.angle = lineAngle([[0, 0], [horizontal, vertical]]) - 90;
        let lineToBlip: Line = [[this.MIDDLE, this.MIDDLE], [this.MIDDLE, this.MIDDLE + (this.backCircleRadius)]]
        lineToBlip = lineRotate(lineToBlip, this.angle, [this.MIDDLE, this.MIDDLE]);
        this.blipPosition = lineToBlip[1];
      } else {
        this.angle = 0;
      }
    })
  }


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
  private readonly DEAD_ZONE = .1;

  public readonly backCircleRadius = 230;

  public horizontalPosition: number = this.MIDDLE;
  public verticalPosition: number = this.MIDDLE;
  public horizontalValue: number = 0;
  public verticalValue: number = 0;

  public angle: number = 0;
  public blipPosition: [number, number] = [this.MIDDLE, 0];
  public force: number = 0;


  public get active(): boolean {
    return this.force > this.DEAD_ZONE;
  }

}
