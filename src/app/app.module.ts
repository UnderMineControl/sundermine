import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserComponent } from './browser/browser.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxElectronModule } from 'ngx-electron';
import { ModlistComponent } from './modlist/modlist.component';
import { ModdetailsComponent } from './moddetails/moddetails.component';
import { SavelistComponent } from './savelist/savelist.component';
import { SavedetailsComponent } from './savedetails/savedetails.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowserComponent,
    ModlistComponent,
    ModdetailsComponent,
    SavelistComponent,
    SavedetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
