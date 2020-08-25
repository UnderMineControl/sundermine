import { Injectable } from '@angular/core';
import { Registry } from 'winreg'; //Force load of winreg

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

    private _registry: WinregStatic;

    get Registry(): WinregStatic{
        if (!this._registry)
            this._registry = window.require('winreg');

        return this._registry;
    }

    constructor() { }

    async GetEntry(key: string, subkey: string, hive: string) : Promise<string> {
        var reg : Registry = new this.Registry({
            hive: hive,
            key: key
        });

        if (!reg)
            return null;

        return new Promise<string>((res, rej) => {
            reg.values((e, items) => {

                if (e) {
                    console.error(`Error while fetching reg-key: LM\\${key}\\${subkey}`, e);
                    res(null);
                    return;
                }

                for(let item of items) {
                    if (item.name === subkey){
                        res(item.value);
                        return;
                    }
                }

                res(null);
                return;

            });
        });
    }

    async LocalMachine(key: string, subkey: string) : Promise<string> {
        return this.GetEntry(key, subkey, this.Registry.HKLM);
    }

    async CurrentUse(key: string, subkey: string) : Promise<string> {
        return this.GetEntry(key, subkey, this.Registry.HKCU);
    }

    async ClassesRoot(key: string, subkey: string) : Promise<string> {
        return this.GetEntry(key, subkey, this.Registry.HKCR);
    }

    async Users(key: string, subkey: string) : Promise<string> {
        return this.GetEntry(key, subkey, this.Registry.HKU);
    }

    async CurrentConfig(key: string, subkey: string) : Promise<string> {
        return this.GetEntry(key, subkey, this.Registry.HKCC);
    }
}
