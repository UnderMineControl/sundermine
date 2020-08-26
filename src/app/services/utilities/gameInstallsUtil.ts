import { LocalMachine } from './registryUtil';
import { GetGamePassWin32, GetSteamDarwin, GetSteamWin32 } from './savePathUtil';
const fs = window.require('fs');
const path = window.require('path');
const os = window.require('os');

const STEAM_REGKEY_32: string = '\\SOFTWARE\\Valve\\Steam';
const STEAM_REGKEY_64: string = '\\SOFTWARE\\Wow6432Node\\Valve\\Steam';

const STEAM_REGKEY_INSTALL: string = 'InstallPath';
const STEAM_DEFAULT_INSTALL: string = 'C:\\Program Files\\Steam';

export interface ISupported {
    path: string;
    supported: boolean;
}

export interface IGameInstall {
    platform: string;
    isSteam: boolean;
    mods: ISupported;
    saves: ISupported;
}

export async function gameInstallations() : Promise<IGameInstall[]> {
    var supported : IGameInstall[] = [];

    if (process.platform === 'win32'){
        var gpSaves = await GetGamePassWin32();
        if (gpSaves && gpSaves != null) {
            supported.push({
                platform: 'win32',
                isSteam: false,
                mods: {
                    path: null,
                    supported: false
                },
                saves: {
                    path: gpSaves,
                    supported: true
                }
			});
        }
    }

    var steam = await new SteamInstallPath().installPath();
	var saves = getSavePath();

    if ((!steam || steam == null) &&
        (!saves || saves == null))
        return supported;

    var install : IGameInstall = {
        platform: process.platform,
        isSteam: true,
        saves: null,
        mods: null
    };

    if (steam && steam != null){
        install.mods = {
            supported: true,
            path: steam
        };
    }

    if (saves && saves != null) {
        install.saves = {
            supported: true,
            path: saves
        }
    }

    supported.push(install);

    return supported;
}

class SteamInstallPath {

    constructor(
        private game: string = 'UnderMine'
    ) { }

    async installPath() : Promise<string> {
        
        switch(process.platform) {

            case 'win32': return this.gameDir(await this.win());
            case 'darwin': return this.gameDir(this.darwin());
            default: return this.gameDir(this.linux());
        }

    }

    //This is here for later support
    private linux() {
        return null;
    }

    private darwin() {
        var steam = path.join(os.homedir(), 'Library', 'Application Support', 'Steam');
        return fs.existsSync(steam) ? steam : null;
    }

    private async win() {
        //Registry isn't supported outside of windows.
        if (process.platform !== 'win32') return null;

        //Fetch the more common 64 bit steam installation (win8+)
        var x64 = await LocalMachine(STEAM_REGKEY_64, STEAM_REGKEY_INSTALL);
        if (x64 && x64 != null && fs.existsSync(x64)) return x64;

        //Fetch the less common 32 bit steam installation (win7)
        var x32 = await LocalMachine(STEAM_REGKEY_32, STEAM_REGKEY_INSTALL);
        if (x32 && x32 != null && fs.existsSync(x32)) return x32;

        //Check the default directory because the registry ones failed for some reason
		if (fs.existsSync(STEAM_DEFAULT_INSTALL)) return STEAM_DEFAULT_INSTALL;

        //No valid installs, return null
        return null;
    }

    private parseVDF(data: string) {
        var records: { key: string, value: string }[] = [];

        var lines = data.split('\n');
    
        for(let line in lines) {
            if (!line.startsWith('\t')) continue;
    
            var parts = line.substring(1, line.length - 2).split('\t\t');
    
            if (parts.length != 2) continue;
    
            records.push({
                key: parts[0].replace('\"', ""),
                value: parts[1].replace('\"', "")
            });
        }
    
        return records;
    }

    private gameDir(steamRoot: string) {
        if (!steamRoot || steamRoot === null) return null;

        //Check to see if UnderMine is present in the default steam directory
        var defPath = path.join(steamRoot, 'steamapps', 'common', this.game);
        if (fs.existsSync(defPath)) return defPath;

        //Get the VDF file path for the file that contains all the steam libraries
        var vdfPath = path.join(steamRoot, 'steamapps', 'libraryfolders.vdf');
        //Get the data from the VDF file
        var data : string = fs.readFileSync(vdfPath, 'utf8');
        //Parse the VDF data
        var vdf = this.parseVDF(data);

        for(let i of vdf) {

            try {
                //All steam libraries have a number as the key
                const parsed = parseInt(i.key);
                if (isNaN(parsed)) continue;

                //see if the undermine directory exists in the given install folder
                var umpath = path.join(i.value, 'steamapps', 'common', this.game);
                if (fs.existsSync(umpath)) return umpath;
            }
            catch (error) {
                console.error('error occurred while checking steam directory', error);
            }
        }

        return null;
    }
}

function getSavePath() {
    switch (process.platform) {
        case 'win32': return GetSteamWin32();
        case 'darwin': return GetSteamDarwin();
        default: return null;
    }
}
