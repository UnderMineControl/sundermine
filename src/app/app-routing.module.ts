import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowserComponent } from './browser/browser.component';
import { ModdetailsComponent } from './moddetails/moddetails.component';
import { ModlistComponent } from './modlist/modlist.component';
import { SavedetailsComponent} from './savedetails/savedetails.component';
import { SavelistComponent } from './savelist/savelist.component';


const routes: Routes = [
    {
        path: '',
        component: ModlistComponent
    },
    {
        path: '',
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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
