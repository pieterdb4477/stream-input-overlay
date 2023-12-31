import {Component, ComponentFactoryResolver, ComponentRef, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ThumbStick} from "../../shared/domain/input-controller";
import {VisualizerThumbstickComponent} from "../visualizers/visualizer-thumbstick/visualizer-thumbstick.component";
import {interval, map} from "rxjs";

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss'
})
export class BoardsComponent {

  @ViewChild('container', {read: ViewContainerRef})
  container!: ViewContainerRef;

  // Keep track of list of generated components for removal purposes
  components: any[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public addThumbSticks(): void {
    const visualizerThumbstickComponent = new VisualizerThumbstickComponent();
    const thumbStick: ThumbStick = {
      verticalAxis: {
        value: interval(100).pipe(map(v => (v / 10) % 2 - 1)),
        index: 0,
        name: ''
      },
      horizontalAxis: {
        value: interval(100).pipe(map(v => (v / 10) % 2 - 1)),
        index: 0,
        name: ''
      },
    }
    // Create component dynamically inside the ng-template
    const componentRef = this.container.createComponent(VisualizerThumbstickComponent);
    componentRef.setInput('thumbStick', thumbStick);
    // Push the component so that we can keep track of which components are created
    this.components.push(componentRef);
  }

  addComponent(componentClass: Type<any>) {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }

  removeComponent(componentClass: Type<any>) {
    // Find the component
    const component = this.components.find((component) => component.instance instanceof componentClass);
    const componentIndex = this.components.indexOf(component);

    if (componentIndex !== -1) {
      // Remove component from both view and array
      this.container.remove(this.container.indexOf(component));
      this.components.splice(componentIndex, 1);
    }
  }
}
