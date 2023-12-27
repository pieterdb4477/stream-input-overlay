import {GamepadAxis, GamepadButton} from "./gamepad-controller-entity";
import {GamepadController, GamepadControllerStorage, ThumbStickStorage} from "./gamepad-controller";
import {DirectionalPad, ThumbStick} from "../input-controller";

/**
 * Generates a GamepadController only based on the given GamePad and pollingRate.
 * @param gamepad Use to try & parse as much data as possible to initialize the GamepadController
 * @param pollingRate the amount of ms between each check of the current value. Lower values give smoother results
 * higher values likely improve performance.
 */
export function fromNavigatorDetectedGamepad(gamepad: Gamepad, pollingRate: number = 100): GamepadController {
  const gamepadController = new GamepadController(
    parseId(gamepad),
    gamepad.axes.map((value, index) => new GamepadAxis(index, gamepad.index)),
    gamepad.buttons.map((value, index) => new GamepadButton(index, gamepad.index)),
    parseName(gamepad),
    pollingRate
  );
  if (gamepad.id.includes('STANDARD GAMEPAD')) {
    console.debug(`gamepad ${gamepad.id} seems to have a default layout, assigning axes to thumbs ticks`)
    autoAssignThumbSticks(gamepadController);
    autoAssignDirectionalPads(gamepadController);
  }
  return gamepadController;
}

export function fromNavigatorDetectedGamepadAndStorage(gamepad: Gamepad, storage: GamepadControllerStorage): GamepadController {
  const gamepadController = new GamepadController(
    storage.id,
    gamepad.axes.map((value, index) => {
      const gamepadAxis = new GamepadAxis(index, gamepad.index);
      gamepadAxis.name = storage.axes[index].name;
      return gamepadAxis;
    }),
    gamepad.buttons.map((value, index) => {
      const gamepadButton = new GamepadButton(index, gamepad.index);
      gamepadButton.name = storage.buttons[index].name;
      return gamepadButton;
    }),
    storage.name,
    storage.pollingRate,
  );
  gamepadController.directionalPads = storage.directionalPads.map(dPad => {
    return {
      up: gamepadController.buttons[dPad.upIndex],
      down: gamepadController.buttons[dPad.upIndex],
      left: gamepadController.buttons[dPad.upIndex],
      right: gamepadController.buttons[dPad.upIndex],
    } as DirectionalPad
  })
  gamepadController.thumbSticks = storage.thumbSticks.map(thumbStick => {
    return {
      verticalAxis: gamepadController.axes[thumbStick.verticalId],
      horizontalAxis: gamepadController.axes[thumbStick.horizontalId],
    } as ThumbStick
  })
  return gamepadController;
}

function parseId(gamepad: Gamepad): string {
  const vendorRegex = /Vendor: ([a-z0-9]+)/;
  const productRegex = /Product: ([a-z0-9]+)/;
  const vendorResult = vendorRegex.exec(gamepad.id);
  const productResult = productRegex.exec(gamepad.id);
  if (vendorResult === null || productResult == null) {
    console.warn(`Could not parse details from gamepad id '${gamepad.id}'`)
    return gamepad.id;
  } else {
    return `${vendorResult[1]}:${productResult[1]}`;
  }
}

function parseName(gamepad: Gamepad): string {
  const nameParseRegex = /^(.*?)\(/;
  const regexResult = nameParseRegex.exec(gamepad.id);

  if (regexResult === null || !regexResult[1]) {
    console.warn(`Could not parse name from ${gamepad.id}`)
    return gamepad.id;
  } else {
    return regexResult[1].trim();
  }
}

function autoAssignThumbSticks(gamepad: GamepadController) {
  gamepad.thumbSticks = [
    {
      horizontalAxis: gamepad.axes[0],
      verticalAxis: gamepad.axes[1]
    }, {
      horizontalAxis: gamepad.axes[2],
      verticalAxis: gamepad.axes[3]
    }
  ]
}

function autoAssignDirectionalPads(gamepad: GamepadController) {
  gamepad.directionalPads = [
    {
      up: gamepad.buttons[12],
      down: gamepad.buttons[13],
      left: gamepad.buttons[14],
      right: gamepad.buttons[15],
    }
  ]
}
