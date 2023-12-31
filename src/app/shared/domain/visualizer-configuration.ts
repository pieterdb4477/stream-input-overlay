import {Axis, Button, DirectionalPad, ThumbStick} from "./input-controller";

export type VisualizerDescription = {
  title: string;
  description: string
  inputs: VisualizerInputs[]
}

export type VisualizerContext = {
  buttons: {
    [label: string]: Button;
  }
  axes: {
    [label: string]: Axis;
  }
  thumbSticks: {
    [label: string]: ThumbStick;
  }
  directionalPads: {
    [label: string]: DirectionalPad
  }
}

type VisualizerInputs = {
  kind: InputKind,
  label: string
}


enum InputKind {
  'Button', 'Axis', 'DirectionalPad', 'ThumbStick'
}

