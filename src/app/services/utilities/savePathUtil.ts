//There is a dependency issue resolving these via normal means, so we'll hook into electrons require system
const os = window.require('os');
const path = window.require('path');
const fs = window.require('fs');

import { Glob } from './globUtil';

export async function GetAllSavePaths() : Promise<string[]> {

	var paths = [];

	var windows = GetSteamWin32();
	var darwin = GetSteamDarwin();
	var gamepass = GetGamePassWin32();

	if (windows && windows != null)
		paths.push(windows);

	if (darwin && darwin != null)
		paths.push(darwin);

	if (gamepass && gamepass != null)
		paths.push(gamepass);

	return paths;

}

//Steam on Windows
export function GetSteamWin32() {
	var steam = path.join(os.homedir(), 'AppData', 'LocalLow', 'Thorium Entertainment', 'UnderMine', 'Saves');
	return fs.existsSync(steam) ? steam : null;
}

//MacOS
export function GetSteamDarwin() {
	var steam = path.join(os.homedir(), 'Library', 'Application Support', 'unity.Thorium Entertainment.UnderMine', 'Saves');
	return fs.existsSync(steam) ? steam : null;
}

//GamePass on Windows
export async function GetGamePassWin32() {
	var gamepass = path.join(os.homedir(), 'AppData', 'Local', 'Packages', 'Thorium.UnderMine_*', 'LocalState', '*Saves');

	var results = await Glob(gamepass);
	if (results == null ||
		results.length <= 0)
		return null;

	return results[0];
}
