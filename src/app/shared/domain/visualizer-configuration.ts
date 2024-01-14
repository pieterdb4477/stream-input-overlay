import {Axis, Button, DirectionalPad, InputEntityKind, ThumbStick} from "./input/input-entities";

/**
 * Interface to be implemented by each component that
 */
export interface Visualizer {
  context: VisualizerContext;
  readonly description: VisualizerDescription;
}

/**
 * Describes what the visualizer represents and which inputs it requires.
 */
export type VisualizerDescription = {
  title: string;
  description: string
  inputs: VisualizerInputs[]
}

/**
 * Contains everything the visualizer needs to work.
 */
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
  kind: InputEntityKind,
  /**
   * Describes to what the input will be bound.
   */
  label: string,
  /**
   * The key that will be used in the VisualizerContext map.
   */
  key: string,
}


