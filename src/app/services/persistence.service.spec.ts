import {TestBed} from '@angular/core/testing';

import {PersistenceService} from './persistence.service';
import {GamepadController} from "../shared/domain/gamepad/gamepad-controller";

describe('PersistenceService', () => {
  let service: PersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to store a gamepad', () => {
    const gamepad = {
      id: 'Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 0ce6)',
      index: 1,
      axes: [0.0,0.0,0.0] as number[],
      buttons: [
        {pressed: false},
        {pressed: false}
      ]
    } as any as Gamepad;
    const gamepadController = new GamepadController(gamepad)
    service.storeController(gamepadController);
  })
});
