import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrebootModule } from 'preboot';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ComponentContainerComponent } from './component-container/component-container.component';
import { ComponentsDirective } from './components.directive';
import { HtmlSnippetComponent } from './html-snippet/html-snippet.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComponentContainerComponent,
    ComponentsDirective,
    HtmlSnippetComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    PrebootModule.withConfig({ appRoot: 'app-root' }),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
