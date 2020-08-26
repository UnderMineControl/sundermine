import { Component, OnInit } from '@angular/core';
import { PathsService } from './../services';

@Component({
    selector: 'app-modlist',
    templateUrl: './modlist.component.html',
    styleUrls: ['./modlist.component.scss']
})
export class ModlistComponent implements OnInit {

    steamInstallPath: string = 'Nothing to see here...';
    savePaths: string[] = [];

    constructor(
        private _sp: PathsService
    ) { }

    ngOnInit(): void {

    }

    async doClick() {
        this.steamInstallPath = await this._sp.steamInstallPath();

        this.savePaths = await this._sp.savePaths();
    }

}
