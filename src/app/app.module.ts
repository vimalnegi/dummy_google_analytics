import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { NvD3Component } from 'ng2-nvd3';
import { ListPaginatedComponent } from './list-paginated/list-paginated.component';


@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    NvD3Component,
    ListPaginatedComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
