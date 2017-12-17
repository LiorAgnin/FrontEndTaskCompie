import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    OrderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDZ1qmcaXkqCinqIUGs43AFKJOTyvl-BNQ',
      libraries: ["places"]
    }),
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
