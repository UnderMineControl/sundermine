import { Injectable } from '@angular/core';
import { RegistryService } from '../registry/registry.service';
import { ElectronService } from 'ngx-electron';
import { IGlob } from 'glob'

//Stupid Electron/Angular resolution issues.
const os = window.require('os');
const path = window.require('path');
const fs = window.require('fs');

const STEAM_REGKEY_32: string = '\\SOFTWARE\\Valve\\Steam';
const STEAM_REGKEY_64: string = '\\SOFTWARE\\Wow6432Node\\Valve\\Steam';

const STEAM_REGKEY_INSTALL: string = 'InstallPath';
const STEAM_DEFAULT_INSTALL: string = 'C:\\Program Files\\Steam';

@Injectable({
  providedIn: 'root'
})
export class PathsService {

    constructor(
        private _reg: RegistryService,
        private _el: ElectronService
    ) { }

    async savePaths() : Promise<string[]> {
        
        var paths : string[] = [];

        var win = this.saves_winSteam();
        var mac = this.saves_macOSSteam();
        var gap = await this.saves_winGamePass();

        if (win && win != null)
            paths.push(win);
        
        if (mac && mac != null)
            paths.push(mac);

        if (gap && gap != null)
            paths.push(gap);

        return paths;
    }

    private saves_winSteam() : string {
        var steam = path.join(os.homedir(), 'AppData', 'LocalLow', 'Thorium Entertainment', 'UnderMine', 'Saves');
        if (fs.existsSync(steam))
            return steam;

        return null;
    }

    private saves_macOSSteam() : string {
        var steam = path.join(os.homedir(), 'Library', 'Application Support', 'unity.Thorium Entertainment.UnderMine', 'Saves');

        if (fs.existsSync(steam))
            return steam;
        
        return null;
    }

    private async fetchDirectory(pattern: string) : Promise<string[]> {
        return new Promise((res, rej) => {
            var g: IGlob = window.require('glob')(pattern, {
                realpath: true,
                absolute: true
            },(e, m) => {
                if (e) {
                    console.error('Glob Error', e);
                    res(null);
                    return;
                }

                res(m);
            });
        });
    }

    private async saves_winGamePass() : Promise<string> {
        var testPath = path.join(os.homedir(), 'AppData', 'Local', 'Packages', 'Thorium.UnderMine_*', 'LocalState', '*Saves');

        var results = await this.fetchDirectory(testPath);
        if (results == null || 
            results.length <= 0)
            return null;

        return results[0];
    }


    async steamInstallPath() {
        if (this._el.isWindows)
            return this.steamInstallPath_win();

        throw new Error("Platform not supported!");
    }

    private async steamInstallPath_win() {
        var x64 = await this._reg.LocalMachine(STEAM_REGKEY_64, STEAM_REGKEY_INSTALL);

        if (x64 && x64 != null)
            return x64;

        var x32 = await this._reg.LocalMachine(STEAM_REGKEY_32, STEAM_REGKEY_INSTALL);
        if (x32 && x32 != null)
            return x32;

        return STEAM_DEFAULT_INSTALL;
    }

}
