import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appComponents]'
})
export class ComponentsDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
