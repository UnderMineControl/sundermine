import { Component, OnInit } from '@angular/core';
import { SavePathsService } from './../save-paths/save-paths.service';

@Component({
    selector: 'app-modlist',
    templateUrl: './modlist.component.html',
    styleUrls: ['./modlist.component.scss']
})
export class ModlistComponent implements OnInit {

    steamInstallPath: string = 'Nothing to see here...';

    constructor(
        private _sp: SavePathsService
    ) { }

    ngOnInit(): void {

    }

    async doClick() {
        this.steamInstallPath = await this._sp.getSteamPath();
    }

}
