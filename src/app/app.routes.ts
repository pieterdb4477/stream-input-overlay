import {Routes} from '@angular/router';
import {DebugComponent} from "./components/debug/debug.component";
import {InputControllersComponent} from "./components/input-controllers/input-controllers.component";
import {BoardsComponent} from "./components/boards/boards.component";

export const routes: Routes = [
  {path: 'boards', component: BoardsComponent},
  {path: 'debug', component: DebugComponent},
  {path: 'controllers', component: InputControllersComponent},
  {path: '**', redirectTo: "boards"},
];
