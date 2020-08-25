import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'SunderMine';

    constructor(private _el: ElectronService) { }

    get window() {
        return this._el.remote.getCurrentWindow();
    }

    doMinimize() {
        this.window.minimize();
    }

    doMaximize(){
        if (this.window.isMaximized())
            this.window.unmaximize();
        else
            this.window.maximize();
    }

    doClose() {
        this.window.close();
    }

    doThorium() {
        this._el.shell.openExternal('https://undermine.game/#thorium');
    }
}   
