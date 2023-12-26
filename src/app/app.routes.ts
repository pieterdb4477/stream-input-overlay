import {Routes} from '@angular/router';
import {DebugComponent} from "./components/debug/debug.component";

export const routes: Routes = [
  {path: '**', component: DebugComponent}
];
