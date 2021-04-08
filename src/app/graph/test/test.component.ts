import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {WordCloudComponent} from "../word-cloud/word-cloud.component";


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild('testContainer', {read: ViewContainerRef}) container;
  componentRef: ComponentRef<WordCloudComponent>;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  createComponent() {
    const factory : ComponentFactory<WordCloudComponent> = this.resolver.resolveComponentFactory(WordCloudComponent);
    this.componentRef = this.container.createComponent(factory);
    console.log('componentRef',this.componentRef);

  }

  remove() {
    this.container.clear();
  }

}
