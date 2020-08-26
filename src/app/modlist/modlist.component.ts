import { Component, OnInit } from '@angular/core';
import { PathsService } from './../services';
import { IGameInstall } from './../services/utilities/gameInstallsUtil';

@Component({
    selector: 'app-modlist',
    templateUrl: './modlist.component.html',
    styleUrls: ['./modlist.component.scss']
})
export class ModlistComponent implements OnInit {

	installs : IGameInstall[] = [];

    constructor(
        private _sp: PathsService
    ) { }

    async ngOnInit() {
		this.installs = await this._sp.getInstallations();
    }

}
