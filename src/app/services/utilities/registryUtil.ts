import { Registry } from 'winreg';

const registry: WinregStatic = window.require('winreg');

async function GetEntry(key: string, subkey: string, hive: string) : Promise<string> {

    var reg = new registry({
        hive: hive,
        key: key
    });

    if(!reg) return null;

    return new Promise<string>((res, rej) => {
        var result : Registry = reg.values((e, items) => {

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

export async function LocalMachine(key: string, subkey: string) : Promise<string> {
    return GetEntry(key, subkey, registry.HKLM);
}

export async function  CurrentUser(key: string, subkey: string) : Promise<string> {
    return GetEntry(key, subkey, registry.HKCU);
}

export async function ClassesRoot(key: string, subkey: string) : Promise<string> {
    return GetEntry(key, subkey, registry.HKCR);
}

export async function Users(key: string, subkey: string) : Promise<string> {
    return GetEntry(key, subkey, registry.HKU);
}

export async function CurrentConfig(key: string, subkey: string) : Promise<string> {
    return GetEntry(key, subkey, registry.HKCC);
}