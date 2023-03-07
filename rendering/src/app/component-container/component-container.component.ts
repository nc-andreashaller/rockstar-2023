import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, OnInit } from '@angular/core';
import { ComponentsDirective } from '../components.directive';
import { HtmlSnippetComponent } from '../html-snippet/html-snippet.component';
import { TeaserListComponent } from '../teaser-list/teaser-list.component';

@Component({
  selector: 'app-component-container',
  templateUrl: './component-container.component.html',
  styleUrls: ['./component-container.component.scss']
})
export class ComponentContainerComponent implements OnInit, OnChanges {

  static type = 'rockstar-2023/components/container';

  @ViewChild(ComponentsDirective, {static: true}) appFragment!: ComponentsDirective;
  @Input() structure: any;
  @Input() ssr: boolean | undefined;
  @Input() columns: number | undefined;
  @Input() columnSpan: number | undefined;

  private componentTypes: any[] = [
    ComponentContainerComponent,
    HtmlSnippetComponent,
    TeaserListComponent,
  ];

  constructor(private host:ElementRef) { }

  ngOnInit(): void {
    this.load();
    this.setColumnSpan();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['structure']) {
      this.load();
    }
    if(changes['columnSpan']) {
      this.setColumnSpan();
    }
  }

  private load(): void {
    console.log('loading components', this.structure);
    this.appFragment.viewContainerRef.clear();
    if(!this.structure) {
      console.log('no structure');
      return;
    }
    this.structure[':itemsOrder']
      .map((key: string) => {
        const component = this.structure[':items'][key];
        const type = this.componentTypes.find(type => type.type === component[':type']);
        return { ...component, ...{key, type} };
      })
      .filter((component: any) => this.componentTypes.map(type => type.type).indexOf(component[':type']) >= 0)
      .forEach((component: any) => {
      console.log('loading component', component);
      const instance: any = this.appFragment.viewContainerRef.createComponent(component.type).instance;
      instance.structure = component;
      instance.columnSpan = this.structure.columnClassNames[component.key].match(/aem-GridColumn--default--(\d+)/)[1];
      instance.reference = component.reference;
    });
  }

  private setColumnSpan(): void {
    this.columns = this.columnSpan || this.structure.columnCount;
    this.host.nativeElement.querySelector('mat-grid-list').style.setProperty('--rockstar-grid-columns', this.columns);
    this.host.nativeElement.style.setProperty('--rockstar-grid-columnspan', this.columnSpan);
  }


}
