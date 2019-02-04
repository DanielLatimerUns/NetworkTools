import { Component, ViewChild } from '@angular/core';
import { TorrentService } from '../../services/torrent.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { AppState } from '../../state/appState';
import { ActionModel } from '../../models/actionModel';

@Component({
    selector: 'app-torrent-manager',
    templateUrl: './torrent-manager.component.html',
    styleUrls: ['./torrent-manager.component.css'],
    providers: [ TorrentService ]
})
export class TorrentManagerComponent {
    constructor(private torrentService: TorrentService, state: AppState) {
      setInterval(() => this.loadTorrents(), 1000);

      state.actionBarActions = [
        new ActionModel (1 , 'Stop All',  () => this.stopAll(this.torrents)),
        new ActionModel (2 , 'Add torrent', this.openNewTorrentWindowButtonClick.bind(this)),
      ];
    }

    public torrents: TorrentModel[];

    public showNewTorrentWindow = false;

    public showTorrentDeleteWindow = false;

    public permaDeleteTorrent = false;

    public selectedTorrent = '';

    @ViewChild(FileUploadComponent)fileUploader: FileUploadComponent;

    loadTorrents() {
      this.torrentService.getTorrents().subscribe(
        response => {
          this.torrents = response;
        },
        error => {
          console.error(error);
        },
        () => {}
      );
    }

    public submitNewTorrent() {
      if (this.fileUploader.torrentFormFile) {
        this.torrentService.addTorrent(this.fileUploader.torrentFormFile)
        .subscribe(
          (response) => {
            this.showNewTorrentWindow = false;
            this.loadTorrents();
          },
          error => {
            console.error(error);
          }
        );
      }
    }

    public startStopTorrent(hash: string) {
      this.torrents.forEach((torrent) => {
        if (torrent.hash === hash) {
          if (torrent.currentState.includes('paused')) {
            this.torrentService.startTorrent(hash)
            .subscribe(
              (result) => console.log(hash + 'Paused'),
              error => console.error(error)
            );
          } else {
            this.torrentService.stopTorrent(hash)
            .subscribe(
              (result) => console.log(hash + 'Started'),
              error => console.error(error)
            );
          }
        }
      });
    }

    private stopAll(torrents: TorrentModel[]) {
      if (!torrents) {
        return;
      }
      torrents.forEach((torrent) => {
        if (!torrent.currentState.includes('paused')) {
          this.torrentService.stopTorrent(torrent.hash).subscribe(
            (result) => console.log(torrent.hash + 'Paused'),
            error => console.error(error)
          );
        }
      });
    }

    public removeTorrent(hash: string, permaDelete: boolean) {
      this.torrentService.removeTorrent(hash, permaDelete)
      .subscribe(
        result => console.log(this.selectedTorrent + 'removed'),
        error => console.error(error)
      );
    }

    public removeTorrentButtonClick() {
      this.removeTorrent(this.selectedTorrent, this.permaDeleteTorrent);
    }

    public closeNewTorrentWindowButtonClick() {
      this.showNewTorrentWindow = false;
    }

    public openNewTorrentWindowButtonClick() {
      this.showNewTorrentWindow = true;
    }

    public closeTorrentDeleteWindowButtonClick() {
      this.showTorrentDeleteWindow = false;
    }

    public openTorrentDeleteWindowButtonClick(hash: string) {
      this.selectedTorrent = hash;
      this.showTorrentDeleteWindow = true;
    }

    public calculateProgress(progress: number) {
      return  `${Math.round((progress / 1) * 100)}%`;
    }

  public calculateRatio(progress: number) {
      return  `${Math.round((progress / 1) * 100)}`;
    }
}
