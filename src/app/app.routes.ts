import {Routes} from '@angular/router';
import {DebugComponent} from "./components/debug/debug.component";
import {InputControllersComponent} from "./components/input-controllers/input-controllers.component";

export const routes: Routes = [
  {path: '**', component: InputControllersComponent}
];
