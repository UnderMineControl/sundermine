import { Injectable } from '@angular/core';
import { RegistryService } from './../registry/registry.service';

const STEAM_REGKEY_32: string = '\\SOFTWARE\\Valve\\Steam';
const STEAM_REGKEY_64: string = '\\SOFTWARE\\Wow6432Node\\Valve\\Steam';

const STEAM_REGKEY_INSTALL: string = 'InstallPath';
const STEAM_DEFAULT_INSTALL: string = 'C:\\Program Files\\Steam';

@Injectable({
  providedIn: 'root'
})
export class SavePathsService {

    constructor(
        private _reg: RegistryService
    ) { }

    async getSteamPath() {
        var x64 = await this._reg.LocalMachine(STEAM_REGKEY_64, STEAM_REGKEY_INSTALL);

        if (x64 && x64 != null)
            return x64;

        var x32 = await this._reg.LocalMachine(STEAM_REGKEY_32, STEAM_REGKEY_INSTALL);
        if (x32 && x32 != null)
            return x32;

        return STEAM_DEFAULT_INSTALL;
    }

}
