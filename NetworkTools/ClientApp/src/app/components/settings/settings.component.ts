import { Component, ViewChild } from '@angular/core';
import { TorrentService } from '../../services/torrent.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { AppState } from '../../state/appState';
import { ActionModel } from '../../models/actionModel';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    providers: [ TorrentService ]
})
export class SettingsComponent {

  constructor(private torrentService: TorrentService, state: AppState) {

    state.actionBarActions = [
      new ActionModel(1, 'General', ""),
      new ActionModel(2, 'Downloads', ""),
      new ActionModel(3, 'Network', ""),
      new ActionModel(4, 'Plugins', ""),
      new ActionModel(5, 'Automation', ""),
      new ActionModel(6, 'Scheduler', ""),
      new ActionModel(7, 'Lables', ""),
      new ActionModel(8, 'Advanced', ""),
      new ActionModel(9, 'About', ""),
    ];
  }

}
