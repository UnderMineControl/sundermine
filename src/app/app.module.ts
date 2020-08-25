import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxElectronModule } from 'ngx-electron';
import { ModlistComponent } from './modlist/modlist.component';
import { ModdetailsComponent } from './moddetails/moddetails.component';
import { SavelistComponent } from './savelist/savelist.component';
import { SavedetailsComponent } from './savedetails/savedetails.component';
import { SettingsComponent } from './settings/settings.component';
import { CreditsComponent } from './credits/credits.component';

@NgModule({
  declarations: [
    AppComponent,
    ModlistComponent,
    ModdetailsComponent,
    SavelistComponent,
    SavedetailsComponent,
    SettingsComponent,
    CreditsComponent
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
