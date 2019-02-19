import { Component, ViewChild } from '@angular/core';
import { TorrentService } from '../../services/torrent.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { AppState } from '../../state/appState';
import { ActionModel } from '../../models/actionModel';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [TorrentService]
})
export class SettingsComponent {

  public showGeneralWindow = true;
  public showDownloadsWindow = false;
  public showNetworkWindow = false;
  public showPluginsWindow = false;
  public showAutomationWindow = false;
  public showSchedulerWindow = false;
  public showLabelsWindow = false;
  public showAdvancedWindow = false;
  public showAboutWindow = false;



  constructor(private torrentService: TorrentService, state: AppState) {

    state.actionBarActions = [
      new ActionModel(1, 'General', "switchWindow(getCurrentwindow(),)"),
      new ActionModel(2, 'Downloads', ""),
      new ActionModel(3, 'Network', ""),
      new ActionModel(4, 'Plugins', ""),
      new ActionModel(5, 'Automation', ""),
      new ActionModel(6, 'Scheduler', ""),
      new ActionModel(7, 'Labels', ""),
      new ActionModel(8, 'Advanced', ""),
      new ActionModel(9, 'About', ""),
    ];
  }

  public getCurrentwindow() {
    if (this.showGeneralWindow = true)
      return 1
    else if (this.showDownloadsWindow = true)
      return 2
    else if (this.showNetworkWindow = true)
      return 3
    else if (this.showPluginsWindow = true)
      return 4
    else if (this.showAutomationWindow = true)
      return 5
    else if (this.showSchedulerWindow = true)
      return 6
    else if (this.showLabelsWindow = true)
      return 7
    else if (this.showAdvancedWindow = true)
      return 8
    else if (this.showAboutWindow = true)
      return 9
  }

  public switchWindow(currentWindow, windowState, newWindow) {

  }

}
