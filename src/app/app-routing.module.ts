import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModdetailsComponent } from './moddetails/moddetails.component';
import { ModlistComponent } from './modlist/modlist.component';
import { SavedetailsComponent} from './savedetails/savedetails.component';
import { SavelistComponent } from './savelist/savelist.component';
import { CreditsComponent } from './credits/credits.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
    {
        path: 'mods',
        component: ModlistComponent
    },
    {
        path: 'mods',
        component: ModdetailsComponent,
        outlet: 'page2'
    },
    {
        path: 'saves',
        component: SavelistComponent
    },
    {
        path: 'saves',
        component: SavedetailsComponent,
        outlet: 'page2'
    }, 
    {
        path: 'settings',
        component: SettingsComponent
    }, 
    {
        path: 'settings',
        component: CreditsComponent,
        outlet: 'page2'
    },
    {
        path: '',
        redirectTo: '/mods(page2:mods)',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/mods(page2:mods)'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
