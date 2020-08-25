import { Component, OnInit } from '@angular/core';
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  private ipc: IpcRenderer;

  constructor() { 
    if((<any>window).require){
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside electron');
    }
  }

  ngOnInit(): void {
  }

  onClick() {
    console.log('Open a modal');
    this.ipc.send('openModal');
  }

}
