import {Injectable} from '@angular/core';
import {InputController} from "../shared/domain/input-controller";
import {
  DirectionalPadStorage,
  GamepadAxisStorage, GamepadButtonStorage,
  GamepadController,
  GamepadControllerStorage, ThumbStickStorage
} from "../shared/domain/gamepad/gamepad-controller";
import {GamepadButton} from "../shared/domain/gamepad/gamepad-controller-entity";

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor() {
  }

  storeController(controller: GamepadController) {
    const {name, pollingRate, id} = controller;
    const axes = controller.axes.map(axis => {
      return {
        name: axis.name,
        index: axis.index
      } as GamepadAxisStorage
    });
    const buttons = controller.buttons.map(button => {
      return {
        name: button.name,
        index: button.index
      } as GamepadButtonStorage
    });
    const thumbSticks = controller.thumbSticks.map(thumbStick => {
      return {
        horizontalId: thumbStick.horizontalAxis.index,
        verticalId: thumbStick.verticalAxis.index
      } as ThumbStickStorage
    })
    const directionalPads = controller.directionalPads.map(directionalPad => {
      return {
        upIndex: directionalPad.up.index,
        downIndex: directionalPad.down.index,
        leftIndex: directionalPad.left.index,
        rightIndex: directionalPad.right.index,
      } as DirectionalPadStorage
    })
    const newOrUpdatedControllerStorage: GamepadControllerStorage = {
      name,
      pollingRate,
      axes,
      buttons,
      thumbSticks,
      directionalPads,
      id
    }
    const controllers = this.controllersFromStorage.filter(controller => controller.id === newOrUpdatedControllerStorage.id);
    controllers.push(newOrUpdatedControllerStorage);
    this.controllersFromStorage = controllers;
  }

  retrieveController(id: string): InputController | null {
    const item = localStorage.getItem("gamepad_" + id);
    return item == null ? null : JSON.parse(item);
  }

  private get controllersFromStorage() : GamepadControllerStorage[] {
    const item = localStorage.getItem('controllers');
    if(item === null) {
      return [];
    }
    return JSON.parse(item);
  }
  private set controllersFromStorage(nextStorage :GamepadControllerStorage[]) {
    localStorage.setItem('controllers', JSON.stringify(nextStorage));
  }

}
