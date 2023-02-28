import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ComponentsDirective } from '../components.directive';
import { HtmlSnippetComponent } from '../html-snippet/html-snippet.component';

@Component({
  selector: 'app-component-container',
  templateUrl: './component-container.component.html',
  styleUrls: ['./component-container.component.scss']
})
export class ComponentContainerComponent implements OnChanges {

  @ViewChild(ComponentsDirective, {static: true}) appFragment!: ComponentsDirective;
  @Input() structure: any;
  @Input() ssr: boolean | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['structure'] && this.structure) {
      this.load();
    }
  }

  private load(): void {
    console.log('loading components', this.structure);
    this.appFragment.viewContainerRef.clear();
    Object.keys(this.structure[':items'])
      .map(key => this.structure[':items'][key])
      .filter(component => component[':type'] === 'rockstar-2023/components/content')
      .forEach(component => {
      console.log('loading component', component);
      const instance = this.appFragment.viewContainerRef.createComponent<HtmlSnippetComponent>(HtmlSnippetComponent).instance;
      instance.reference = component.reference;
    });
  }



}
