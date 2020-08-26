import { IGlob } from 'glob'; //This is more to force node to include glob. 
const glob = window.require('glob');

export async function Glob(pattern: string) : Promise<string[]> {
    return new Promise((res, rej) => {

        var g: IGlob = glob(pattern, {
            realpath: true,
            absolute: true
        }, (error: Error, matches: string[]) => {
            if (error) {
                //We expect an error when the directory doesn't exist or match the target environment.
                //We're just going to swallow the error, and return null
                console.error('Error with Glob Pattern Match: ' + pattern, error);
                res(null);
                return;
            }

            res(matches);
        });
    });
}