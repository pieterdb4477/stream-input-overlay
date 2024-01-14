import {
  GamepadAxis,
  GamepadButton,
  GamepadEntity,
  isGamepadEntity
} from "../domain/input/gamepad/gamepad-controller-entity";
import {GamepadController} from "../domain/input/gamepad/gamepad-controller";
import {DirectionalPad, InputEntity, ThumbStick} from "../domain/input/input-entities";
import {combineLatest} from "rxjs";

export function fromNavigatorDetectedGamepad(gamepad: Gamepad, pollingRate: number = 50): GamepadController {
  const gamepadId = parseId(gamepad);
  const inputEntities: InputEntity<unknown>[] = [
    ...gamepad.axes.map((value, index) => new GamepadAxis(index, gamepad.index, gamepadId) as GamepadEntity<unknown>),
    ...gamepad.buttons.map((value, index) => new GamepadButton(index, gamepad.index, gamepadId) as GamepadEntity<unknown>)
  ];


  if (gamepad.id.includes('STANDARD GAMEPAD')) {
    console.debug(`gamepad ${gamepad.id} seems to have a default layout, assigning axes to thumbs ticks and d-pad`)
    inputEntities.push(defaultDirectionalPad(inputEntities, gamepadId));
    inputEntities.push(...defaultThumbsticks(inputEntities, gamepadId));
  }
  const gamepadController = new GamepadController(
    gamepadId,
    parseName(gamepad),
    pollingRate,
    inputEntities,
  );
  return gamepadController;
}

function defaultDirectionalPad(inputEntities: InputEntity<unknown>[], gamepadId: string): DirectionalPad {
  const observables = {
    up: (getGamepadEntityAtIndex(inputEntities, 12) as InputEntity<boolean>).value,
    down: (getGamepadEntityAtIndex(inputEntities, 13) as InputEntity<boolean>).value,
    left: (getGamepadEntityAtIndex(inputEntities, 14) as InputEntity<boolean>).value,
    right: (getGamepadEntityAtIndex(inputEntities, 15) as InputEntity<boolean>).value,
  };
  const combined = combineLatest(observables)
  return new DirectionalPad(`${gamepadId}:directionalpad:1`, combined, 'D-pad 1');
}

function defaultThumbsticks(inputEntities: InputEntity<unknown>[], gamepadId: string): InputEntity<unknown>[] {
  const stickOne = {
    horizontal: (getGamepadEntityAtIndex(inputEntities, 0) as InputEntity<number>).value,
    vertical: (getGamepadEntityAtIndex(inputEntities, 1) as InputEntity<number>).value,
  };
  const stickTwo = {
    horizontal: (getGamepadEntityAtIndex(inputEntities, 0) as InputEntity<number>).value,
    vertical: (getGamepadEntityAtIndex(inputEntities, 1) as InputEntity<number>).value,
  };
  return [
    new ThumbStick(`${gamepadId}:thumbstick:1`, combineLatest(stickOne), 'Thumbstick 1'),
    new ThumbStick(`${gamepadId}:thumbstick:2`, combineLatest(stickOne), 'Thumbstick 2'),
  ]
}

function getGamepadEntityAtIndex(inputEntities: InputEntity<unknown>[], index: number): InputEntity<unknown> | undefined {
  return inputEntities.find(entity => isGamepadEntity(entity) && entity.index === index)
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
