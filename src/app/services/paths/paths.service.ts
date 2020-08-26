import { Injectable } from '@angular/core';
import { gameInstallations } from '../utilities/gameInstallsUtil';

@Injectable({
  providedIn: 'root'
})
export class PathsService {

    constructor() { }

	async getInstallations() {
		return await gameInstallations();
	}
}
